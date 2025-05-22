import { db } from "@/lib/prisma";
import { TfIdf } from "natural";

/**
 * Normalize text: lowercases, strips punctuation, collapses spaces
 */
function preprocessText(text) {
  if (!text || typeof text !== "string") return "";
  let t = text.toLowerCase();
  t = t.replace(/[.,\/#!$%\^&\*<>\-=\+_`~\{\}\[\]:;"'?]/g, "");
  return t.replace(/\s{2,}/g, " ").trim();
}

function cosineSimilarity(a, b) {
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] ** 2;
    magB += b[i] ** 2;
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  return magA && magB ? dot / (magA * magB) : 0;
}

/**
 * Fetch jobs and filter by any segment of industry
 */
async function fetchJobsFilteredByIndustry(industry) {
  const API_URL = process.env.NEXT_PUBLIC_JOBS_API_URL;
  if (!API_URL) return [];
  const res = await fetch(`${API_URL}/api/v1/jobs`, {
    headers: process.env.JOBS_API_TOKEN
      ? { Authorization: `Bearer ${process.env.JOBS_API_TOKEN}` }
      : {},
  });
  if (!res.ok) return [];
  const { jobs } = await res.json();
  if (!Array.isArray(jobs)) return [];
  if (!industry) return jobs.map((j) => mapJob(j));

  const segments = industry.split("-").map((s) => preprocessText(s));
  const filtered = jobs.filter((j) => {
    const combined = [j.position, j.company, j.description, j.requirements]
      .filter(Boolean)
      .join(" ");
    const norm = preprocessText(combined);
    return segments.some((seg) => norm.includes(seg));
  });
  return filtered.map((j) => mapJob(j));
}

/**
 * Map raw API job to our shape
 */
function mapJob(job) {
  return {
    id: job._id || job.id,
    jobTitle: job.position,
    companyName: job.company,
    jobLocation: job.jobLocation,
    salary: job.salary,
    requirements: job.requirements,
    contactEmail: job.contactEmail,
    jobDescription: job.description,
    createdAt: job.createdAt,
    requiredSkills: job.requirements
      ? job.requirements.split(",").map((s) => s.trim())
      : [],
  };
}

/**
 * Generate job recommendations for a given user.
 * Returns *all* industry-filtered jobs ranked by relevance.
 */
export async function generateRecommendations(clerkUserId) {
  const user = await db.user.findUnique({
    where: { clerkUserId },
    select: { industry: true, bio: true, skills: true, experience: true },
  });
  if (!user) throw new Error("User not found");

  const jobs = await fetchJobsFilteredByIndustry(user.industry);
  if (!jobs.length) return [];

  const profileText = [
    user.industry,
    user.bio,
    ...(user.skills || []),
    user.experience,
  ]
    .filter(Boolean)
    .join(" ");
  const userDoc = preprocessText(profileText);

  const tfidf = new TfIdf();
  tfidf.addDocument(userDoc);
  const jobDocs = jobs.map((j) =>
    preprocessText(
      [
        j.jobDescription,
        j.jobTitle,
        j.companyName,
        j.requiredSkills.join(" "),
      ].join(" "),
    ),
  );
  jobDocs.forEach((d) => tfidf.addDocument(d));

  const vocabSet = new Set();
  for (let i = 0; i <= jobDocs.length; i++) {
    tfidf.listTerms(i).forEach(({ term }) => vocabSet.add(term));
  }
  const vocab = Array.from(vocabSet);

  const buildVec = (idx) => vocab.map((term) => tfidf.tfidf(term, idx));
  const userVec = buildVec(0);

  const scored = jobDocs.map((_, i) => ({
    job: jobs[i],
    score: cosineSimilarity(userVec, buildVec(i + 1)),
  }));

  // Return all jobs sorted by descending score
  return scored.sort((a, b) => b.score - a.score).map((x) => x.job);
}

"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin, DollarSign, Mail, Clock } from "lucide-react";

// Helper: Returns relative time like "1h ago" or "3d ago"
function getRelativeTime(isoString) {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function RecommendationsClient() {
  const { user, isLoaded } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
    setLoading(true);
    fetch(`/api/recommendations?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setJobs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isLoaded, user]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="gradient-title gradient-modern text-3xl font-bold md:text-4xl">
          Recommended for You
        </h1>
        <p className="text-muted-foreground">
          Personalized job matches based on your skills and preferences
        </p>
      </div>

      {loading ? (
        <JobSkeletons count={3} />
      ) : !jobs.length ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

function JobCard({ job }) {
  const [isHovered, setIsHovered] = useState(false);

  // Extract first letter of company name for the avatar
  const companyInitial = job.companyName
    ? job.companyName.charAt(0).toUpperCase()
    : "C";

  return (
    <Card
      className="overflow-hidden border-l-4 border-l-transparent transition-all duration-300 hover:border-l-primary hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 font-semibold text-primary">
              {companyInitial}
            </div>
            <div>
              <CardTitle className="line-clamp-1">{job.jobTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">{job.companyName}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={14} className="mr-1" />
            {getRelativeTime(job.createdAt)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin size={12} />
            {job.jobLocation}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <DollarSign size={12} />
            {job.salary}
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="mb-2 text-sm font-medium">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 4).map((skill, i) => (
                <Badge key={i} variant="outline" className="bg-primary/5">
                  {skill}
                </Badge>
              ))}
              {job.requiredSkills.length > 4 && (
                <Badge variant="outline" className="bg-primary/5">
                  +{job.requiredSkills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Description:</h4>
            <div
              className="prose prose-sm line-clamp-3 max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: job.jobDescription.substring(0, 180) + "...",
              }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-end border-t bg-muted/20 pt-3">
        <a
          href={`mailto:${job.contactEmail}`}
          className={`inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isHovered ? "bg-primary" : "bg-primary/80"}`}
        >
          <Mail size={16} className="mr-2" /> Apply Now
        </a>
      </CardFooter>
    </Card>
  );
}

function JobSkeletons({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div>
                    <Skeleton className="mb-1 h-6 w-40" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            </CardHeader>

            <CardContent className="pb-6">
              <div className="mb-4 flex gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="space-y-3">
                <div>
                  <Skeleton className="mb-2 h-4 w-28" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>

                <div>
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-muted/20 pt-3">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-28" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Briefcase size={32} />
      </div>
      <h3 className="mb-3 text-2xl font-semibold">No recommendations yet</h3>
      <p className="mb-8 max-w-md text-muted-foreground">
        We're working on finding the perfect job matches for your profile. Check
        back soon or update your skills to get more recommendations.
      </p>
    </div>
  );
}

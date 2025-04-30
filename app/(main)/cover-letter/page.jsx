import { getCoverLetters } from "@/actions/cover-letter";
import ClientCoverLetterSection from "./_components/client-cover-letter-section";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="container mx-auto py-8">
      <ClientCoverLetterSection coverLetters={coverLetters} />
    </div>
  );
}

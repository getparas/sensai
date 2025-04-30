import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-2">
        <h1 className="gradient-title gradient-premium text-5xl font-bold md:text-6xl">
          Resume Builder
        </h1>
        <p className="text-lg text-muted-foreground">
          Create a professional resume that stands out with our easy-to-use
          builder
        </p>
      </div>
      <ResumeBuilder initialContent={resume?.content} />
    </div>
  );
}

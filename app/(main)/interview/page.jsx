import { getAssessments } from "@/actions/interview";
import ClientInterviewPrep from "./client-interview-prep";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();
  return <ClientInterviewPrep assessments={assessments} />;
}

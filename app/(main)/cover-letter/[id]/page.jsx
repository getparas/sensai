import { getCoverLetter } from "@/actions/cover-letter";
import ClientCoverLetterDetail from "./ClientCoverLetterDetail";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return <ClientCoverLetterDetail coverLetter={coverLetter} />;
}

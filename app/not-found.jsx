import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-4 flex min-h-[100vh] flex-col items-center justify-center text-center">
      <h1 className="gradient-title gradient-premium mb-4 text-6xl font-bold">
        404
      </h1>
      <h2 className="text-semibold mb-4 text-2xl">Page Not Found</h2>
      <p className="mb-8 text-gray-600">
        Oops! The page yo&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/">
        <Button className="animate-pulse">Return Home</Button>
      </Link>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] mx-4 text-center">
      <h1 className="text-6xl font-bold gradient-title gradient-premium mb-4">
        404
      </h1>
      <h2 className="text-2xl text-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! The page yo&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link href="/">
        <Button className="animate-pulse">Return Home</Button>
      </Link>
    </div>
  );
}

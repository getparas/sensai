import React from "react";
import { redirect } from "next/navigation";
import RecommendationsClient from "@/components/RecommendationsClient";
import { getUserOnBoardingStatus } from "@/actions/user";

export default async function RecommendedJobsPage() {
  const { isOnboarded } = await getUserOnBoardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto p-4">
      <RecommendationsClient />
    </div>
  );
}

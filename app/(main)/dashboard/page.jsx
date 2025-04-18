import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnBoardingStatus();
  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return <div>IndustryInsightsPage</div>;
};

export default IndustryInsightsPage;

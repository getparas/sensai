import { industries } from "@/data/industries";
import React from "react";
import OnBoardingForm from "./_components/onboarding-form";
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

const OnBoardingPage = async () => {
  // Check if user is already onboarded
  const { isOnboarded } = await getUserOnBoardingStatus();
  if (isOnboarded) {
    redirect("/dashboard");
  }
  return (
    <main>
      <OnBoardingForm industries={industries} />
    </main>
  );
};

export default OnBoardingPage;

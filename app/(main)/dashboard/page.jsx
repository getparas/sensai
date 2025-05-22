// // import { getIndustryInsights } from "@/actions/dashboard";
// // import { getUserOnBoardingStatus } from "@/actions/user";
// // import { redirect } from "next/navigation";
// // import React from "react";
// // import DashboardView from "./_components/dashboard-view";

// // const IndustryInsightsPage = async () => {
// //   const { isOnboarded } = await getUserOnBoardingStatus();

// //   const insights = await getIndustryInsights();
// //   // If not onboarded, redirect to onboarding page
// //   // Skip this check if already on the onboarding page
// //   if (!isOnboarded) {
// //     redirect("/onboarding");
// //   }
// //   return (
// //     <div className="container mx-auto">
// //       <DashboardView insights={insights} />
// //     </div>
// //   );
// // };

// // export default IndustryInsightsPage;
// // app/dashboard/page.jsx

// import React from "react";
// import DashboardView from "./_components/dashboard-view";
// import { getIndustryInsights } from "@/actions/dashboard";
// import { getUserOnBoardingStatus } from "@/actions/user";
// import { redirect } from "next/navigation";
// import RecommendationsClient from "./_components/RecommendationsClient";

// export default async function IndustryInsightsPage() {
//   // 1) Check onboarding on the server:
//   const { isOnboarded } = await getUserOnBoardingStatus();
//   if (!isOnboarded) {
//     // Redirect to /onboarding if user hasn’t finished onboarding
//     redirect("/onboarding");
//   }

//   // 2) Fetch any “industry insights” you need for DashboardView:
//   const insights = await getIndustryInsights();

//   // 3) Render the DashboardView + a child client component
//   return (
//     <div className="container mx-auto p-4">
//       <DashboardView insights={insights} />
//       <RecommendationsClient />
//     </div>
//   );
// }
import React from "react";
import DashboardView from "./_components/dashboard-view";
import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function IndustryInsightsPage() {
  // Check onboarding status
  const { isOnboarded } = await getUserOnBoardingStatus();
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  // Fetch insights
  const insights = await getIndustryInsights();

  return (
    <div className="container mx-auto p-4">
      <DashboardView insights={insights} />
    </div>
  );
}

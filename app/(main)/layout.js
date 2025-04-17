import React from "react";

const MainLayout = ({ children }) => {
  // Redirect user after onboarding
  return <div className="container mx-auto mt-24 mb-20">{children}</div>;
};

export default MainLayout;

import React from "react";

const MainLayout = ({ children }) => {
  // Redirect user after onboarding
  return <div className="container mx-auto mb-20 mt-24">{children}</div>;
};

export default MainLayout;

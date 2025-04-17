import React from "react";

const CoverLetter = async ({ params }) => {
  const { id } = await params;
  return <div>CoverLetter: {id}</div>;
};

export default CoverLetter;

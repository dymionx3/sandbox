"use client";

import React from "react";

const CompanyFooter: React.FC = () => {
  return (
    <div className="p-4 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} M.V. Electronix LLC
      </p>
    </div>
  );
};

export default CompanyFooter;
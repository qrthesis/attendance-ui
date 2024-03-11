"use client";
import React from "react";
import Header from "./Header";

import useDashboard from "./useDashboard";

const DashboardLayout = ({ children }: any) => {
  const { user } = useDashboard();
  return (
    <>
      <Header role={user?.role} />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;

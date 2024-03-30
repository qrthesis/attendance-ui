"use client";
import React from "react";
import Header from "./Header";

const DashboardLayout = ({ children }: any) => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <>
      <Header role={user?.role} />
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;

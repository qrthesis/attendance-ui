"use client";
import React from "react";
import Header from "./Header";

const DashboardLayout = ({ children }: any) => {

  return (
    <>
      <Header/>
      <main>{children}</main>
    </>
  );
};

export default DashboardLayout;

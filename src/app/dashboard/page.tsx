"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";

import Header from "./Header";

import useDashboard from "./useDashboard";

const DashboardPage: React.FC = () => {
  const { user } = useDashboard();

  const router = useRouter();

  console.log(user);

  return (
    <div>
      <Header role={user?.role} />
      Table
    </div>
  );
};

export default DashboardPage;

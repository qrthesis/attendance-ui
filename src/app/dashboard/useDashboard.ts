"use client";

import { useAppSelector } from "@/utils/ducks/store";
import React, { useState, useEffect } from "react";

const useDashboard = () => {
  const { user } = useAppSelector((state) => state.authSlice);

  return {
    user,
  };
};

export default useDashboard;

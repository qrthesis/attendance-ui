"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/queries/login";
import { useAppDispatch } from "@/utils/ducks/store";

import { saveUser } from "@/utils/ducks/reducers/auth";

const useLogin = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [userCredential, setUserCredential] = useState<any>({
    email: "",
    password: "",
  });
  const [pageIndicators, setPageIndicators] = useState<any>({
    error: "",
    isLoading: false,
  });

  const handleResetFields = () => {
    setPageIndicators({
      error: "",
      isLoading: false,
    });
    setUserCredential({
      email: "",
      password: "",
    });
  };

  const handleLogin = async () => {
    setPageIndicators((prevState: any) => ({ ...prevState, isLoading: true }));
    const user = await login(userCredential.email, userCredential.password);

    if (!user) {
      setPageIndicators({
        error: "User credentials are invalid!",
        isLoading: false,
      });
    } else {
      handleResetFields();
      dispatch(saveUser(user));
      router.replace("/dashboard/events");
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    setUserCredential((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));

    if (pageIndicators.error !== "") {
      setPageIndicators((prevState: any) => ({ ...prevState, error: "" }));
    }
  };

  return {
    handleFieldChange,
    handleLogin,
    userCredential,
    pageIndicators,
  };
};

export default useLogin;

"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

import styles from "./styles.module.css";

import { login } from "@/utils/queries/login";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // You can add your login logic here
    console.log("Logging in with:", { email, password });

    const user = await login(email, password)

    console.log('Result ', user)

    setIsLoading(false)
    if (!user) {
      setError("User credentials are invalid!")
    } else {
      router.replace('/dashboard')
    }
  };
  
  const handleEmailChange = (e: any) => {
    setError("")
     setEmail(e.target.value)
  }
  
  const handlePasswordChange = (e: any) => {
    setError("")
    setPassword(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label className={styles.localLabel} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.localInput}
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.localLabel} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.localInput}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <button className={styles.localButton} onClick={handleLogin}>
          { isLoading ? 'Logging in ...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

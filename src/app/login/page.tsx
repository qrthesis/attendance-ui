"use client";
import React, { useState } from "react";

import styles from "./styles.module.css";

import useLogin from "./useLogin";

const LoginPage: React.FC = () => {
  
  const {
    handleFieldChange,
    handleLogin,
    userCredential: {
      email,
      password
    },
    pageIndicators: {
      error,
      isLoading
    }
  } = useLogin()

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
            onChange={(e) => handleFieldChange('email', e.target.value)}
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
            onChange={(e) => handleFieldChange('password', e.target.value)}
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

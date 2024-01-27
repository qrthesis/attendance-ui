"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // You can add your login logic here
    console.log("Logging in with:", { username, password });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label className={styles.localLabel} htmlFor="username">
            Username:
          </label>
          <input
            className={styles.localInput}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.localButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

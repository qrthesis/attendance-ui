"use client";

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/dashboard/register-user">Register User</Link>
          </li>
          <li>
            <Link href="/dashboard/create-event">Create Event</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

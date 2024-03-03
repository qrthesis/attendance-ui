"use client";

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

interface IHeaderProps {
  role: 'admin' | 'student' | undefined
}

const Header: React.FC<IHeaderProps> = ({
  role
}) => {

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.home}`}>
            <Link href="/dashboard">Home</Link>
          </li>
          {role === 'admin' && (
            <>
              <li className={styles.navItem}>
                <Link href="/dashboard/register-user">Register User</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/dashboard/events" >Events</Link>
              </li>
            </>
          )}
          <li className={styles.navItem}>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

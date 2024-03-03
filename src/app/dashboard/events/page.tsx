'use client'

import React from 'react'
import styles from "./styles.module.css";

import Header from '../Header'

import useDashboard from '../useDashboard'


const CreateEventPage: React.FC<any> = () => {
  const { user } = useDashboard()

  return (
    <div>
      <Header role={ user?.role}/>
       <button className={styles.localButton} onClick={() => {}}>
          Create New Event
        </button>
    </div>
  );
}

export default CreateEventPage
'use client'

import React from 'react'

import Header from '../Header'
import useDashboard from '../useDashboard'

const CreateEventPage: React.FC<any> = () => {
  const { user } = useDashboard()

  return (
    <div>
      <Header role={ user?.role}/>
      Create
    </div>
  );
}

export default CreateEventPage
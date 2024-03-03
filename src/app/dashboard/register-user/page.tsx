'use client'

import React from 'react'

import Header from '../Header'
import useDashboard from '../useDashboard'

const RegisterUserPage: React.FC<any> = () => {
  const { user } = useDashboard()

  return (
    <div>      
      <Header role={user?.role}/>
      Register
    </div>
  );
}

export default RegisterUserPage
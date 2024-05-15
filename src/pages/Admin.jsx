import React from 'react'
import { isAdminConnected } from '../components/Auth';
import { useEffect, useState } from 'react';
import Dashboard from '../components/admin/Dashboard';
const Admin = () => {
  const [loading , setLoading] = useState(true)
  
  return (
    <div className='bg-zinc-900 w-full min-h-screen max-h-screen h-screen'>
      <Dashboard/>
    </div>
  )
  
}

export default Admin

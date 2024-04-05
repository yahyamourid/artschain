import React from 'react'
import { isAdminConnected } from '../components/Auth';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [loading , setLoading] = useState(true)
  
  return (
    <div>
      <p>admin</p>
    </div>
  )
  
}

export default Admin

import React from 'react'
import { useState } from 'react'
import Sidebar from '../components/client/SideBar'

import Dashboard from '../components/client/Dashboard'
import Market from '../components/client/Market'

const Client = () => {
  const [state, setState] = useState('home')
  return (
    <div className='bg-zinc-900 w-full h-screen min-h-screen max-h-screen'>
      <Sidebar state={setState}/>
      {state == 'home' && <Dashboard/>}
      {state == 'market' && <Market/>}
    </div>
  )
}

export default Client

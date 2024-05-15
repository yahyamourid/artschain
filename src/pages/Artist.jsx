import React from 'react'
import { isArtistConnected } from '../components/Auth';
import { useEffect, useState } from 'react';
import Sidebar from '../components/artist/Sidebar';
import Dashboard from '../components/artist/Dashboard';
import AddArtWork from '../components/artist/AddArtWork';
import ArtWorkDetails from '../components/artist/ArtWorkDetails';

const Artist = () => {
  const [state, setState] = useState('home')
  return (
    <div className='bg-zinc-900 w-full min-h-screen max-h-screen'>
      <Sidebar state={setState}/>
      {state == 'home' && <Dashboard/>}
      {state == 'addArtWork' && <AddArtWork/>}
      
    </div>
  )
}
export default Artist

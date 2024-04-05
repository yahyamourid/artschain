import React from 'react'
import fox from '../assets/fox.png'

const InstallMetamask = () => {

  return (
    <div className='w-full h-screen min-h-full flex items-center justify-center bg-slate-950'>
      <div className='flex flex-col items-center justify-center gap-8 w-2/5 h-2/3 bg-slate-900  rounded-md '>
        <img className='w-32 h-32' src={fox}/>
        <h1 className='text-white text-4xl font-semibold tracking-wider'>You should install MetaMask</h1>
        <p className='text-lg text-zinc-400 font-medium tracking-wider text-center'>
          MetaMask is a browser extension that allows you to interact with Ethereum-based applications
          directly from your browser. Please install MetaMask to proceed.
        </p>
        <p>
          <a href="https://metamask.io/" className='text-slate-950 text-lg px-6 py-2 rounded-full hover:bg-slate-400 bg-zinc-200'>Install</a>
        </p>
      </div>
    </div>
  )
}

export default InstallMetamask

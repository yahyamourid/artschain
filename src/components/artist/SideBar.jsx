import React from 'react'
import { useEffect } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { PiMagicWand } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
const sidebar = (props) => {
  const handleWalletDisconnect = () => {
    localStorage.removeItem("userDet");
    window.location.reload();
  };
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0)
        handleWalletDisconnect();
    };
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);
  return (
    <div className='fixed left-3 flex flex-col w-[60px] justify-start items-center h-full bg-zinc-800 rounded-lg mt-3  border border-violet-400  border-opacity-30'>
      <a href='/'><p className='text-white mt-3 text-2xl tracking-wider font-extrabold'>A<span className='text-violet-700'>C</span></p></a>
      <span className='flex flex-col items-center justify-center gap-10 text-white mt-28 text-xl w-full'>

        <button className='cursor-pointer w-2/3 flex justify-center hover:bg-violet-700 p-2.5 duration-500 rounded-full' onClick={() => props.state('home')}>
          <IoHomeOutline className='' />
        </button>

        <span>
          <PiMagicWand />
        </span>

        <button className='cursor-pointer w-2/3 flex justify-center hover:bg-violet-700 duration-500 p-2 rounded-full' onClick={() => props.state('addArtWork')}>
          <IoAddCircleOutline />
        </button>

        <span>
          <FaUserCog />
        </span>
      </span>
    </div>
  )
}

export default sidebar

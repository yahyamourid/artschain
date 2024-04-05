import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import { FaCopy } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import LastArtWork from './LastArtWork';
import ArtworksCarousel from './ArtWorksCarousel';
import ArtWorkDetails from './ArtWorkDetails';

const Dashboard = () => {
  const [showArtWork, setShowArtWork] = useState(false)
  const [artWork, setArtWork] = useState(null)
  const [artWorks, setArtWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const copyToClipboard = (ref) => {
    navigator.clipboard.writeText(ref);
  };
  const shortenAddress = (address) => {
    return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`;
  };
  const getArtWorks = async () => {
    setLoading(true)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
    const result = await artsChainContract.getUserArtworks();
    setArtWorks(result)
    console.log(result[result.length - 1])
    setLoading(false)
  }
  useEffect(() => {
    getArtWorks()
  }, [])
  return (
    <>
      {!showArtWork ?
        <div className='ml-[60px] text-white flex items-center justify-center min-h-screen h-screen py-6 px-8 gap-5'>
          {loading ? <p>loading</p>
            :
            (artWorks.length > 0 ?
              <>
                <div className='flex flex-col items-start justify-center w-3/4 h-full '>
                  <LastArtWork lastArtWork={artWorks[artWorks.length - 1]} />
                  <ArtworksCarousel artWorks={artWorks} showArtWork={setShowArtWork} setArtWork={setArtWork} />
                </div>
                <div className='flex flex-col items-center justify-center w-1/4 h-full bg-zinc-800 rounded-xl 
                border border-violet-600 border-opacity-20 '>
                  statistics
                </div>
              </>:
              <p>No data to display</p>)
              
          }

        </div>
        :
        <ArtWorkDetails artWork={artWork} hash={'eee'} new={false} showArtWork={setShowArtWork}/>
      }
    </>
  )
}

export default Dashboard

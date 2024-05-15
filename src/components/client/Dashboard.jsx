import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
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
        <div className='ml-[20px] text-white flex items-center justify-center min-h-screen h-screen py-6 px-8 gap-5'>
          {loading ? <p>loading</p>
            :
            (artWorks.length > 0 ?
              <>
                <div className='flex flex-col items-start justify-center w-4/5 h-full '>
                  <LastArtWork lastArtWork={artWorks[artWorks.length - 1]} />
                  <ArtworksCarousel artWorks={artWorks} showArtWork={setShowArtWork} setArtWork={setArtWork} />
                </div>
                
              </>:
              <p>No data to display</p>)
              
          }

        </div>
        :
        <ArtWorkDetails artWork={artWork} hash={'eee'} new={false} showArtWork={setShowArtWork} data={getArtWorks}/>
      }
    </>
  )
}

export default Dashboard

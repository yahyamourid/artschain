import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../lib/constants';
import BounceLoader from "react-spinners/BounceLoader"
import CertificateModel from '../assets/CertificateModel';
import { getHash } from '../components/db/FireBaseDB';

const Certificate = () => {
  const { id } = useParams();
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [artwork, setArtWork] = useState(null);
  const certificateRef = useRef(null);

  useEffect(() => {
    const getArtWork = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const result = await artsChainContract.getArtWorkById(id);
        const rep = await getHash(id)
        setTimeout(() => {
          setLoading(false);
          setArtWork(result);
          setHash(rep)
          console.log(result);
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
          setNotFound(true);
        }, 2000);
        console.log("ArtWork Doesn't exist", error);
      }
    };
    getArtWork();
  }, []);
 
  return (
    <>
      {loading ?
        <div className='flex items-center justify-center min-h-screen h-full text-xl bg-white text-violet-600 font-semibold '>
          < BounceLoader color='#B431FF' />
        </div>
        :
        (!notFound ?
          <div className='relative flex items-center justify-center min-h-screen h-screen w-full p-8 bg-gray-100'>
            <CertificateModel artwork={artwork} ref={certificateRef} hash={hash}/>
            {/* <span className='absolute bottom-2 flex '>
              <button onClick={handleDownloadPDF}>Download as PDF</button>
              <button >Download as JPG</button>
            </span> */}
          </div>
          :
          <div className='flex items-center justify-center min-h-screen h-full text-xl font-light '>
            404 | This ArtWork Could Not Be Found.
          </div>
        )
      }
    </>
  );
};

export default Certificate;

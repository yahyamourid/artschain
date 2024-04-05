import React from 'react'
import { IoIosArrowDroprightCircle, IoIosCloudUpload } from "react-icons/io";
import { FaUpload, FaEthereum  } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
const HowItsWorks = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full bg-slate-950 min-h-screen '>
        <p className='text-white font-bold text-4xl tracking-widest mb-20'>How It Works</p>
        <div className="flex items-center justify-center w-full">
        <span className='flex flex-col items-center  w-1/6 gap-2'>
            <FaUpload  className='text-pink-700 text-4xl'/>
            <p className='text-xl text-white font-bold'>Upload Your Artwork</p>
            <p className='text-gray-400 text-center'>Artists can upload images of their artwork along with relevant details using our intuitive interface</p>
        </span>
        <IoIosArrowDroprightCircle className='text-4xl text-pink-700 w-1/12'/>
        <span className='flex flex-col items-center  w-1/6 gap-2'>
            <IoIosCloudUpload  className='text-pink-700 text-4xl'/>
            <p className='text-xl text-white font-bold'>Store on IPFS </p>
            <p className='text-gray-400 text-center'>The artwork image is securely stored on the IPFS, a decentralized file system, ensuring accessibility and permanence</p>
        </span>
        <IoIosArrowDroprightCircle className='text-4xl text-pink-700 w-1/12'/>
        <span className='flex flex-col items-center  w-1/6 gap-2'>
            <FaEthereum   className='text-pink-700 text-4xl'/>
            <p className='text-xl text-white font-bold'>Record on Blockchain</p>
            <p className='text-gray-400 text-center'>The details of the artwork, including its title, artist name, and IPFS location, are recorded on the blockchain</p>
        </span>
        <IoIosArrowDroprightCircle className='text-4xl text-pink-700 w-1/12'/>
        <span className='flex flex-col items-center  w-1/6 gap-2'>
            <PiCertificateBold  className='text-pink-700 text-4xl'/>
            <p className='text-xl text-white font-bold'>Generate Certificate</p>
            <p className='text-gray-400 text-center'>Upon successful recording on the blockchain, a digital certificate of authenticity is automatically generated</p>
        </span>
      
        </div>
        
       
      
    </div>
  )
}

export default HowItsWorks

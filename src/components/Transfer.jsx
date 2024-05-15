import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../lib/constants';
import { motion } from 'framer-motion';

const Transfer = (props) => {
    const [history, setHistory] = useState(null)
    const animation = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            x: -80,
            y: -20

        },
        show: {
            opacity: 1,
            scale: 1,
            x: 0,
            y:0,
            transition: {
                delay: 0.1,
                duration: 0,
                ease: 'easeInOut'
            }
        }
    };
    const getTransfer = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const result = await artsChainContract.getArtworkTransferHistory(props.artWorkId, props.owner)
        setHistory(result)
        console.log(result)
    }
    useState(() => {
        getTransfer()
    }, [])
    const shortenAddress = (address) => {
        return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`;
    };

    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000);

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    }
    return (
        <motion.div
            className="fixed transform duration-700 ease-in top-0 left-0 z-50 w-1/3 h-screen flex p-5 bg-zinc-800 justify-center backdrop-blur-sm"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            variants={animation} initial="hidden" animate="show">
            <button className='absolute text-white text-xl top-4 right-4 ' onClick={() => props.showTransfer(false)}>
                <IoCloseSharp className='' />
            </button>
            <div className="flex flex-col text-white w-full gap-2 mt-10">
                {history != null && history.map((item,index) =>(
                    <div className='flex w-full text-sm items-center border p-2 rounded-md  border-violet-500 border-opacity-60 hover:bg-zinc-800 hover:bg-opacity-60 duration-300'>
                        <div className="flex flex-col w-4/5 my-1">
                            <span className='flex items-center'>
                                <p className='font-semibold text-zinc-400'>From: </p>
                                <p className='ml-2 text-base '>{item[0]} |</p>
                                <p className='ml-1 text-base '>{shortenAddress(item[1])}</p>
                            </span>
                            <span className='flex'>
                                <p className='font-semibold text-violet-400'>To: </p>
                                <p className='ml-2 text-base '>{item[2]} |</p>
                                <p className='ml-1 text-base '>{shortenAddress(item[3])}</p>
                            </span>
                            <p className='text-zinc-500'>{formatDate(item[4])}</p>
                        </div>
                        <div className="flex flex-col w-2/5 bg-violet-800 text-center font-semibold">
                            <p className='text-lg'>{item[5].toString()} MAD</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className='text-white absolute bottom-0' >
                
            </button>
        </motion.div>
    )
}

export default Transfer

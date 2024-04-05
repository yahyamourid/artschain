import React, { useState, useEffect } from 'react'
import { FaCopy } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import { getHash } from '../db/FireBaseDB';
const LastArtWork = (props) => {
    const [hash, setHash] = useState('')
    const lastArtWork = props.lastArtWork
    const copyToClipboard = (ref) => {
        navigator.clipboard.writeText(ref);
    };
    const shortenAddress = (address) => {
        return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`;
    };
    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000);

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    }
    const getHashById = async () => {
        const rep = await getHash(lastArtWork[3])
        setHash(rep)
    }
    useEffect(() => {
        getHashById()
    })

    return (

        <div className='flex w-3/4 bg-zinc-800 h-1/2 rounded-t-lg rounded-bl-lg rounded-br-3xl border border-violet-400  border-opacity-30'>
            <span className='flex flex-col text-xs items-start justify-center text-zinc-400 w-1/2 h-full px-4 py-2'>
                <p className='font-bold text-zinc-500'>Last Art work</p>
                <p className='text-2xl font-extrabold tracking-wide my-3 text-white'>{lastArtWork[4]}</p>
                <p className='tracking-wide'>{lastArtWork[3]}</p>
                <p className='mt-1'>{lastArtWork[9]}x{lastArtWork[10]}</p>
                <span className='flex items-center'>
                    <p>owner:&nbsp;{shortenAddress(lastArtWork[1])}</p>
                    <button onClick={() => copyToClipboard(lastArtWork[1])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <FaCopy />
                    </button>
                </span>
                <span className='flex items-center tracking-wide w-full'>
                    <p >ImIPFS: &nbsp;</p>
                    <p >{shortenAddress(lastArtWork[6])}</p>
                    <button onClick={() => copyToClipboard(lastArtWork[6])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <FaCopy />
                    </button>
                    <a href={`https://gateway.pinata.cloud/ipfs/${lastArtWork[6]}`} target='_blank'
                        className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <GoLink />
                    </a>
                </span>
                <span className='flex w-full items-center text-white justify-between gap-1 my-4'>
                    <button className='w-1/2 p-x-4 py-1 bg-violet-600 rounded-full hover:bg-violet-500'>
                        <a href={`/certificates/${lastArtWork[3]}`} target='_blank'>Certificat</a>
                    </button>
                    <button className='w-1/2 p-x-4 py-1 bg-zinc-800  rounded-full border border-zinc-600 hover:bg-zinc-700'>
                        <a href={`https://sepolia.etherscan.io/tx/${hash}`} target='_blank'>Etherscan</a>
                    </button>
                </span>
            </span>
            <span className='group flex items-end justify-center w-1/2 m-3 bg-green-300 rounded-xl hover:scale-95 duration-500' style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${lastArtWork[6]})`, backgroundSize: 'cover' }}>
                <p className='mb-4 text-lg font-bold text-wite opacity-0 group-hover:opacity-100 duration-500'>{formatDate(lastArtWork[7])}</p>
            </span>
        </div>
    )


}

export default LastArtWork

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import { RxDoubleArrowRight } from "react-icons/rx";
const LastTransaction = () => {
    const [data, setData] = useState([]);
    const [artwork, setartwork] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const rep = await artsChainContract.getAllTransactions();
            const n = rep.length
            const rep2 = await artsChainContract.getArtWorkByIdGen(rep[n - 1][6])
            setData(rep[n - 1]);
            setartwork(rep2)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const shortenAddress = (address) => {
        return `${address.substring(0, 3)}...${address.substring(address.length - 3)}`;
    };
    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000);

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    }
    const getTimeDifference = (timestamp) => {
        const currentTime = Date.now();
        const diff = currentTime - (Number(timestamp) * 1000); // Convert timestamp to milliseconds
        const minutes = Math.floor(diff / (1000 * 60)); // Convert milliseconds to minutes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)); // Approximation: 30 days per month

        if (minutes < 60) {
            return `${minutes} mins`;
        } else if (days < 1) {
            return 'one day';
        } else if (days < 30) {
            return `${days} days`;
        } else {
            return `${months} months`;
        }
    };


    useEffect(() => {
        getData();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div className='relative flex flex-col items-center w-full h-full bg-zinc-800 rounded-lg p-2 gap-1.5'>
            <p className='absolute top-1 left-1 text-zinc-500 text-xs'>Last Transaction</p>
            <div className="flex  w-full gap-4 items-center justify-center mt-2">
                <p className='font-medium'>{data[0]} </p>
                <RxDoubleArrowRight className='mt-1 text-violet-500 text-lg'/>
                <p className='font-medium'>{data[2]}</p>
            </div>
            <div className="relative flex w-4/5 items-center group justify-center hover:scale-105 duration-500 rounded-lg h-4/5" style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${artwork.imageUrl})`, backgroundSize: 'cover' }}>
                <p className='absolute group-hover:hidden top-1 right-2 bg-pink-100 font-medium rounded-sm text-pink-500 px-1 text-xs '>{data[5].toString() + "MAD"}</p>
                <p className='absolute group-hover:hidden bottom-1 text-xs bg-zinc-700 p-1 rounded-sm bg-opacity-70 '>{formatDate(data[4])}</p>
            </div>

        </div>
    )
}

export default LastTransaction

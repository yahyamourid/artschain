import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';

const Transactions = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const rep = await artsChainContract.getAllTransactions();
            setData(rep);
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
        <div className='flex flex-col w-full h-full bg-zinc-800 rounded-lg  py-3 px-3 tracking-wider'>
            <p className='text-zinc-500 mb-2'>Recent Transactions</p>
            <div className="grid grid-cols-7 w-full items-center font-semibold text-zinc-400 justify-center text-center text-xs border-b border-zinc-600 border-opacity-50 rounded-t-md py-2">
                <p >Sender</p>
                <p>address</p>
                <p>Recipient</p>
                <p>address</p>
                <p>ArtWorkId</p>
                <p>Price</p>
                <p>Time</p>
            </div>
            <div className='  font-normal'>
                {[...data].reverse().map((item, index) => (
                    <div className="grid grid-cols-7 border-b border-zinc-600 border-opacity-50 text-xs items-center justify- border-t-0 text-center py-2" key={index}>
                        <p>{item[0]}</p>
                        <p className='text-zinc-400'>{shortenAddress(item[1])}</p>
                        <p>{item[2]}</p>
                        <p className='text-zinc-400'>{shortenAddress(item[3])}</p>
                        <p className='cursor-pointer hover:text-violet-400'>{item[6]}</p>
                        <p className='text-violet-400'>{item[5].toString()} MAD</p>
                        <p className='text-zinc-400'>{getTimeDifference(item[4])}</p>
                    </div>
                ))}


            </div>

        </div>
    )
}

export default Transactions

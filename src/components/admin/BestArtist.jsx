import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import artist from '../../assets/artist.png'

const BestArtist = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const rep = await artsChainContract.getBestArtistSellerInfo();
            setData(rep);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    const shortenAddress = (address) => {
        return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
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
        <div className='relative flex flex-col tracking-wider items-center justify-center text-white bg-zinc-800 w-full h-full p-2 rounded-lg'>
            <p className='absolute top-1 left-1 text-zinc-500 text-xs '>Best Artist Seller </p>
            <div className="w-12 h-12 bg-violet-400 rounded-full p-2" style={{ backgroundImage: `url(${artist})`, backgroundSize: 'cover' }}></div>
            <p className='text-base font-semibold'>{data[1] + " " + data[2]}</p>
            <p className='text-xs text-zinc-500 font-medium'>{shortenAddress(data[4])}</p>
            <p className='text-base bg-violet-700 mt-1 px-3 rounded-sm font-semibold'>{data[5].toString()}<span className='ml-1 '>Sales</span></p>

        </div>
    )
}

export default BestArtist

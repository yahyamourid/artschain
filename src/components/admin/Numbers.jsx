import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import { FaUsers, FaMagic } from 'react-icons/fa';
import { RiNftFill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { FaHandHoldingDollar } from "react-icons/fa6";

const Numbers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const rep = await artsChainContract.getData();
            setData(rep);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
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
        <div className="flex items-center w-ful h-full gap-3 tracking-wider">
            <div className="flex items-center justify-center w-1/5 h-full bg-zinc-800 px-2 rounded-lg">
                <span className="flex flex-col items-center justify-center w-1/2 h-full gap-3">
                    <p className="text-lg font-medium text-zinc-400">Artists</p>
                    <p className="text-4xl font-semibold">{data[0].toString()}</p>
                </span>
                <span className="flex items-center justify-center w-1/3 h-1/2 bg-violet-100 p-1 bg-opacity-10 rounded-lg">
                    <FaMagic className="text-xl text-violet-500" />
                </span>
            </div>
            <div className="flex items-center justify-center w-1/5 h-full bg-zinc-800 px-2 rounded-lg">
                <span className="flex flex-col items-center justify-center w-1/2 h-full gap-3">
                    <p className="text-lg font-medium text-zinc-400">Clients</p>
                    <p className="text-4xl font-semibold">{data[1].toString()}</p>
                </span>
                <span className="flex items-center justify-center w-1/3 h-1/2 bg-green-100 p-1 bg-opacity-10 rounded-lg">
                    <FaUsers className="text-xl text-green-500" />
                </span>
            </div>
            <div className="flex items-center justify-center w-1/5 h-full bg-zinc-800 px-2 rounded-lg">
                <span className="flex flex-col items-center justify-center w-1/2 h-full gap-3">
                    <p className="text-lg font-medium text-zinc-400">Arworks</p>
                    <p className="text-4xl font-semibold">{data[2].toString()}</p>
                </span>
                <span className="flex items-center justify-center w-1/3 h-1/2 bg-yellow-100 p-1 bg-opacity-10 rounded-lg">
                    <RiNftFill className="text-xl text-yellow-500" />
                </span>
            </div>
            <div className="flex items-center justify-center w-1/5 h-full bg-zinc-800 px-2 rounded-lg">
                <span className="flex flex-col items-center justify-center w-1/2 h-full gap-3">
                    <p className="text-lg font-medium text-zinc-400">ForSale</p>
                    <p className="text-4xl font-semibold">{data[3].toString()}</p>
                </span>
                <span className="flex items-center justify-center w-1/3 h-1/2 bg-pink-100 p-1 bg-opacity-10 rounded-lg">
                    <FaHandHoldingDollar className="text-xl text-pink-500" />
                </span>
            </div>
            <div className="flex items-center justify-center w-1/5 h-full bg-zinc-800  rounded-lg">
                <span className="flex flex-col items-center justify-center w-1/2 h-full gap-3">
                    <p className="text-base font-medium text-zinc-400">Transactions</p>
                    <p className="text-4xl font-semibold">{data[4].toString()}</p>
                </span>
                <span className="flex items-center justify-center w-1/3 h-1/2 ml-3  bg-sky-100 p-1 bg-opacity-10 rounded-lg">
                    <GrTransaction className="text-xl text-sky-500" />
                </span>
            </div>
        </div>
    );
};

export default Numbers;

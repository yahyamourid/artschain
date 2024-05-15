import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../lib/constants';
import BounceLoader from "react-spinners/BounceLoader";
import { FaCopy } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import { LuCrown } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { CiWallet, CiImageOn } from "react-icons/ci";
import { RxDimensions } from "react-icons/rx";
import { getHash } from '../components/db/FireBaseDB';
import Transfer from '../components/Transfer';
import { FaMoneyBillTransfer } from "react-icons/fa6";
const Artwork = () => {
    const { id } = useParams();
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [artwork, setArtWork] = useState(null);
    const [showTransfer, setShowTransfer] = useState(false)
    const imageIpfsRef = useRef(null);
    const ownerAddressRef = useRef(null);
    const urlEtherscane = `https://sepolia.etherscan.io/tx/${hash}`;

    const copyToClipboard = (ref) => {
        navigator.clipboard.writeText(ref);
        toast('copied successfully', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        })
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


    useEffect(() => {
        const getArtWork = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
                const result = await artsChainContract.getArtWorkByIdGen(id);
                const rep = await getHash(result[3])
                setTimeout(() => {
                    setLoading(false);
                    setArtWork(result);
                    setHash(rep)
                    console.log(result);
                }, 1000);
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
                <div className='flex items-center justify-center min-h-screen h-full text-xl bg-zinc-950 text-violet-500 font-semibold '>
                    < BounceLoader color='#B431FF' />
                </div>
                :
                (!notFound ?
                    <div className='relative flex items-center min-h-screen w-full h-screen p-4 gap-4 bg-zinc-950 text-white'>
                        <div className='flex w-4/5 items-center mx-auto gap-4  h-full'>
                            <div className='w-3/5  h-4/5 bg-cover bg-center rounded-lg' style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${artwork[6]})` }}></div>
                            <div className='w-1/2 flex flex-col items-start bg-zinc-800 rounded-xl p-4'>
                                <span className='text-3xl font-bold tracking-wider mb-4'>
                                    {artwork[4]}
                                    <span className='ml-2 text-sm font-semibold text-zinc-500'>{artwork[3]}</span>
                                </span>
                                <span className='flex items-center mb-2'>
                                    <span className='text-base font-medium text-zinc-600 flex items-center'>
                                        <HiOutlinePaintBrush className='mr-1' />
                                        Artist:
                                    </span>
                                    <span className='ml-1 text-base text-zinc-200'>{artwork[2]}</span>
                                </span>
                                <span className='flex items-center mb-2'>
                                    <span className='text-base font-medium text-zinc-600 flex items-center'>
                                        <CiWallet className='mr-1' />
                                        Artist Address:
                                    </span>
                                    <span className='ml-1 text-base text-zinc-200'>{shortenAddress(artwork[0])}</span>
                                    <button onClick={() => copyToClipboard(artwork[0])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                                        <FaCopy />
                                    </button>
                                </span>
                                <span className='flex items-center mb-2'>
                                    <span className='text-base font-medium text-zinc-600 flex items-center'>
                                        <CiImageOn className='mr-1' />
                                        Image IPFS:
                                    </span>
                                    <span ref={imageIpfsRef} className='ml-1 text-base text-zinc-200'>{shortenAddress(artwork[6])}</span>
                                    <button onClick={() => copyToClipboard(artwork[6])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                                        <FaCopy />
                                    </button>
                                    <a href={`https://gateway.pinata.cloud/ipfs/${artwork[6]}`} target='_blank' rel="noreferrer" className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                                        <GoLink />
                                    </a>
                                </span>
                                <span className='flex items-center mb-2'>
                                    <span className='text-base font-medium text-zinc-600 flex items-center'>
                                        <RxDimensions className='mr-1' />
                                        Size:
                                    </span>
                                    <span className='ml-1 text-base text-zinc-200'>{artwork[10]} x {artwork[11]}</span>
                                </span>
                                <span className='flex items-center mb-2'>
                                    <span className='text-base font-medium text-zinc-600 flex items-center'>
                                        <LuCrown className='mr-1' />
                                        Owner:
                                    </span>
                                    <span ref={ownerAddressRef} className='ml-1 text-base text-zinc-200'>{shortenAddress(artwork[1])}</span>
                                    <button onClick={() => copyToClipboard(artwork[1])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                                        <FaCopy />
                                    </button>
                                </span>
                                <span className='flex items-center mb-2'>
                                    <span className='text-base font-medium text-zinc-600 flex items-center'>
                                        <BsCalendar2Date className='mr-1' />
                                        Created:
                                    </span>
                                    <span className='ml-1 text-base text-zinc-200'>{formatDate(artwork[7])}</span>
                                </span>
                                <div className='flex justify-between w-full gap-4 mt-4'>
                                    <button className='w-1/2 py-2 bg-violet-600 rounded-full text-white hover:bg-violet-500'>
                                        <a href={`/certificates/${artwork[3]}`} target='_blank' rel="noreferrer">View Certificate</a>
                                    </button>
                                    <button className='w-1/2 py-2 bg-zinc-800 rounded-full border border-zinc-600 text-white hover:bg-zinc-700'>
                                        <a href={urlEtherscane} target='_blank' rel="noreferrer">View On Etherscan</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            className='absolute top-6 left-6 text-4xl hover:scale-110 text-zinc-600 duration-500 hover:text-violet-500'
                            onClick={() => setShowTransfer(true)}
                        >
                            <FaMoneyBillTransfer />
                        </button>
                    </div>
                    :
                    <div className='flex items-center justify-center bg-black text-white min-h-screen h-full text-xl font-light '>
                        404 | This ArtWork Could Not Be Found.
                    </div>
                )
            }
            {showTransfer && <Transfer showTransfer={setShowTransfer} artWorkId={id} owner={artwork.owner}/>}
        </>
    );
};

export default Artwork;

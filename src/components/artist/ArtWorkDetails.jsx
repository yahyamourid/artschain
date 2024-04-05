import React, { useRef, useState, useEffect } from 'react';
import { FaCopy } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import { LuCrown } from "react-icons/lu";
import { BsCalendar2Date } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { CiWallet, CiImageOn } from "react-icons/ci";
import { RxDimensions } from "react-icons/rx";
import ParticlesBgHome from '../../assets/config/ParticlesBgHome';
import Confetti from 'react-confetti';
import { toast, ToastContainer } from 'react-toastify'; // Importez toast depuis react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import { getHash } from '../db/FireBaseDB';

const ArtWorkDetails = (props) => {
    const imageIpfsRef = useRef(null);
    const ownerAddressRef = useRef(null);
    const artWork = props.artWork
    const [hash, setHash] = useState('')

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
    console.log(artWork)
    const shortenAddress = (address) => {
        return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`;
    };
    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000);

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    }
    const getHashByartworkId = async() => {
        try {
            const res = await getHash(artWork[3])
            console.log(res)
            setHash(res)
        } catch (error) {
            console.log(error)
        }
    }
    const [showConfetti, setShowConfetti] = useState(false);
    useEffect(() => {
        getHashByartworkId()
        if (props.new == true) {
            setShowConfetti(true)
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 6000);
            return () => clearTimeout(timer);
        }

    }, []);

    return (
        <div className=' relative ml-[40px] text-white flex items-center justify-center h-screen px-24 py-12 gap-8'>
            <div className='flex flex-col items-center justify-center w-1/2 gap-2 border-dashed border border-gray-400 h-full rounded-lg ' style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${artWork[6]})`, backgroundSize: 'cover' }}>
            </div>
            {showConfetti && <Confetti className='flex justify-center items-center text-center mx-auto w-2/3 h-4/5' />}
            <div className='flex flex-col items-start w-1/2 h-3/4 bg-zinc-800 rounded-xl p-8'>
                <span className='text-3xl font-bold tracking-wider mb-8 flex items-end'>
                    {artWork[4]}
                    <p className='flex items-center ml-2 text-sm font-semibold text-zinc-500'>{artWork[3]}</p>
                </span>
                <span className='flex items-center tracking-wide mb-1'>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><HiOutlinePaintBrush className='mr-1' />Artist: &nbsp;</p>
                    <p className='text-base text-zinc-200'>{artWork[2]}</p>
                </span>
                <span className='flex items-center tracking-wide mb-1 '>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><CiWallet className='mr-1' />Artist Adress: &nbsp;</p>
                    <p className='text-base text-zinc-200'>{shortenAddress(artWork[0])}</p>
                    <button onClick={() => copyToClipboard(artWork[0])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <FaCopy />
                    </button>
                </span>
                <span className='flex items-center tracking-wide mb-1'>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><CiImageOn className='mr-1' />Image IPFS: &nbsp;</p>
                    <p ref={imageIpfsRef} className='text-base text-zinc-200'>{shortenAddress(artWork[6])}</p>
                    <button onClick={() => copyToClipboard(artWork[6])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <FaCopy />
                    </button>
                    <a href={`https://gateway.pinata.cloud/ipfs/${artWork[6]}`} target='_blank'
                        className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <GoLink />
                    </a>
                </span>
                <span className='flex items-center tracking-wide mb-1'>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><RxDimensions className='mr-1' />Size: &nbsp;</p>
                    <p className='text-base text-zinc-200'>{artWork[9]}x{artWork[10]}</p>
                </span>

                <span className='flex items-center tracking-wide mb-1'>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><LuCrown className='mr-1' />Owner: &nbsp;</p>
                    <p ref={ownerAddressRef} className='text-base text-zinc-200'>{shortenAddress(artWork[1])}</p>
                    <button onClick={() => copyToClipboard(artWork[1])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <FaCopy />
                    </button>
                </span>
                <span className='flex items-center tracking-wide mb-1'>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><BsCalendar2Date className='mr-1' />Created: &nbsp;</p>
                    <p className='text-base text-zinc-200'>{formatDate(artWork[7])}</p>
                </span>
                <span className='flex w-4/5 items-center justify-between gap-4 my-4'>
                    <button className='w-1/2 p-x-4 py-1 bg-violet-600 rounded-full hover:bg-violet-500'>
                        <a href={`/certificates/${artWork[3]}`} target='_blank'>View Certificate</a>
                    </button>
                    <button className='w-1/2 p-x-4 py-1 bg-zinc-800  rounded-full border border-zinc-600 hover:bg-zinc-700'>
                        <a href={`https://sepolia.etherscan.io/tx/${hash}`} target='_blank'>View On Etherscan</a>
                    </button>
                </span>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {!props.new &&
                <button className='absolute top-4 left-20 flex items-center gap-2 hover:text-pink-500 duration-300'
                    onClick={() => props.showArtWork(false)}>
                    <BsArrowLeftCircleFill /> Go back
                </button>
            }
        </div>
    );
}

export default ArtWorkDetails;

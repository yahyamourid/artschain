import React, { useRef, useState, useEffect } from 'react';
import { ethers } from 'ethers';
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
import { FaHandHoldingDollar } from "react-icons/fa6";
import { getHash } from '../db/FireBaseDB';
import { BiHide } from "react-icons/bi";
import LoadingModal from '../LoadingModal';
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { contractAdress, contractABI } from '../../../lib/constants';
import ChangePropriete from './ChangePropriete';
import { GiCardExchange } from "react-icons/gi";
import { IoMdPricetags } from "react-icons/io";

const ArtWorkDetails = (props) => {
    const imageIpfsRef = useRef(null);
    const ownerAddressRef = useRef(null);
    const artWork = props.artWork
    const [hash, setHash] = useState('')
    const [price, setPrice] = useState(0)
    const [changeSale, setChangSale] = useState(false)
    const [showPrice, setShowprice] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showPropriete, setShowPropriete] = useState(false)

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
    const getHashByartworkId = async () => {
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

    const handlePriceInput = (e) => {
        setPrice(e.target.value)
    }
    const putForSale = async () => {
        setShowModal(true)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const result = await artsChainContract.putArtworkForSale(artWork[3], price)
        const rep = await result.wait()
        setShowModal(false)
        setPrice(false)
        props.data()
        props.showArtWork(false)
    }

    const removeForSale = async () => {
        setShowModal(true)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const result = await artsChainContract.putArtworkNotForSale(artWork[3])
        const rep = await result.wait()
        setShowModal(false)
        props.data()
        props.showArtWork(false)
    }

    const handlePutSale = () => {

    }

    return (
        <div className=' relative ml-[40px] text-white flex items-center justify-center h-screen px-24 py-12 gap-8'>
            <div className='flex flex-col items-center justify-center w-1/2 gap-2 border-dashed border border-gray-400 h-full rounded-lg ' style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${artWork[6]})`, backgroundSize: 'cover' }}>
            </div>
            {showConfetti && <Confetti className='flex justify-center items-center text-center mx-auto w-2/3 h-4/5' />}
            <div className='relative flex flex-col justify-center items-start w-1/2 h-5/6 bg-zinc-800 rounded-xl p-8'>
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
                    <p className='text-base text-zinc-200'>{artWork[10]}x{artWork[11]}</p>
                </span>

                <span className='flex items-center tracking-wide mb-1'>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><LuCrown className='mr-1' />Owner: &nbsp;</p>
                    <p ref={ownerAddressRef} className='text-base text-zinc-200'>{shortenAddress(artWork[1])}</p>
                    <button onClick={() => copyToClipboard(artWork[1])} className='ml-3 p-1 rounded-lg duration-300 text-zinc-500 hover:bg-zinc-500 hover:text-zinc-300'>
                        <FaCopy />
                    </button>
                </span>
                <span className='flex items-center tracking-wide '>
                    <p className='text-base font-medium text-zinc-600 flex items-center'><BsCalendar2Date className='mr-1' />Created: &nbsp;</p>
                    <p className='text-base text-zinc-200'>{formatDate(artWork[7])}</p>
                </span>

                <span className='flex w-4/5  items-center mt-8 mx-auto text-sm justify-between gap-4 my-4'>
                    <button className='w-1/2 p-x-4 py-1 bg-orange-600 rounded-full hover:bg-orange-700 duration-300'>
                        <a href={`/certificates/${artWork[3]}`} target='_blank'>View Certificate</a>
                    </button>
                    <button className='w-1/2 p-x-4 py-1 bg-zinc-800  rounded-full border border-zinc-600 hover:bg-zinc-700'>
                        <a href={`https://sepolia.etherscan.io/tx/${hash}`} target='_blank'>View On Etherscan</a>
                    </button>
                </span>
                {showPrice &&
                    <span className='flex items-center justify-center mt-3 mx-auto gap-2'>
                        <input className='text-white border-zinc-700 bg-zinc-800 focus:ring-0 focus:border-zinc-500 h-6 p-4 tracking-widest rounded-md  text-xl w-28 text-center' type='number' value={price} onChange={handlePriceInput} />
                        <p>MAD</p>
                        <button onClick={() => putForSale()}>
                            <GiConfirmed className='text-zinc-400 text-lg hover:text-green-500' />
                        </button>
                        <button onClick={() => setShowprice(false)}>
                            <MdOutlineCancel className='text-zinc-500 text-xl hover:text-red-600' />
                        </button>
                    </span>

                }
                {
                    artWork.forSale == false ?
                        <button
                            className='absolute top-5 right-5 text-3xl flex items-center text-zinc-500 gap-2 hover:text-orange-500 hover:scale-110 duration-500'
                            onClick={() => setShowprice(true)}
                        >
                            <FaHandHoldingDollar />

                        </button>
                        :
                        <span className='absolute top-3 right-3 flex gap-4'>
                            <span className='flex items-end tracking-wide gap-1 my-3'>
                                <IoMdPricetags className='text-xl mb-1' />
                                <p className='text-3xl text-orange-600 font-bold'>{artWork[9].toString()} </p>
                                <p className='text-sm mb-1'>MAD</p>
                            </span>

                            <button className=' text-3xl flex items-center text-zinc-500 gap-2 hover:text-orange-600 hover:scale-110 duration-500'
                                onClick={() => removeForSale()}
                            >
                                <BiHide />
                            </button>
                        </span>
                }
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
            {showModal && <LoadingModal message={'Artwork status is being changed'} />}
            {!props.new &&
                <button className='absolute top-4 left-20 flex items-center gap-2 hover:text-orange-500 duration-300'
                    onClick={() => props.showArtWork(false)}>
                    <BsArrowLeftCircleFill /> Go back
                </button>

            }
            {artWork.forSale && <button className='absolute bottom-6 right-6 text-5xl hover:scale-110 flex items-center gap-2 hover:text-orange-500 duration-300'
                onClick={() => setShowPropriete(true)}>
                <GiCardExchange />
            </button>}
            {showPropriete &&
                <ChangePropriete
                    setPropriete={setShowPropriete}
                    artWorkId={artWork[3]}
                    data={props.data}
                    showArtWork={props.showArtWork}
                />}
        </div>

    );
}

export default ArtWorkDetails;

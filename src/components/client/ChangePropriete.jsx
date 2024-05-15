import React from 'react'
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import user from '../../assets/user.png'
import { IoClose } from "react-icons/io5";
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import HashLoader from "react-spinners/HashLoader"
import LoadingModal from '../LoadingModal';
const ChangePropriete = (props) => {
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(false)
    const [client, setClient] = useState(null)
    const [LoadingMod, setLoadingMod] = useState(false)
    const handleUserNameInput = (e) => {
        setUserName(e.target.value)
    }

    const search = async () => {
        setLoading(true)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const rep = await artsChainContract.getUserAddressByUsername(userName)
        if (/0{3}$/.test(rep))
            setClient(null)
        else
            setClient(rep)

        console.log(rep)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    const transform = async () => {
        setLoadingMod(true)
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const rep = await artsChainContract.transferArtworkOwnership(signer.address, client, props.artWorkId)
        const result = await rep.wait()
        props.showArtWork(false)
        props.data()
        setLoading(false)
    }
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center backdrop-blur-sm " style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className='relative flex flex-col w-1/3 bg-zinc-800 items-center  py-12 h-1/2 rounded-md'>
                <p className='text-xl font-semibold mb-2'>Choose a new owner for this artwork</p>
                <span className='flex w-2/3 mt-3 mb-2 items-center gap-3'>
                    <input
                        className='w-4/5 bg-zinc-800 rounded-xl h-8 focus:ring-0 border duration-700 border-zinc-700 focus:border-zinc-600 hover:bg-zinc-700 text-sm' placeholder='Enter the userName'
                        value={userName} onChange={handleUserNameInput} />
                    <button
                        className='flex w-1/5 gap-2 items-center justify-center hover:bg-white  duration-500 bg-[#E8CEFA] text-violet-800 font-bold p-1 rounded-xl'
                        onClick={search}>
                        <CiSearch className='' />
                    </button>
                </span>
                {!loading ?
                    (client ?
                        <span className='flex items-center w-5/6 cursor-pointer duration-200  hover:bg-zinc-700 p-2 my-4 gap-3 border-zinc-700 border rounded-md'
                                onClick={() => transform()}>
                            <img src={user} className='w-12 h-12' />
                            <span className='flex flex-col gap-1'>
                                <p className='text-base font-medium tracking-wider'>{userName}</p>
                                <p className='text-xs'>{client}</p>

                            </span>
                        </span>
                        :
                        <p className='text-zinc-500 mt-3'>not found</p>
                    )
                    :
                    <HashLoader className='my-6' size={40} color='#E8CEFA' />
                }
                <button className='absolute top-3 right-3 text-xl text-zinc-700 hover:text-white duration-300'
                    onClick={() => props.setPropriete(false)}>
                    <IoClose />
                </button>
            </div>
            {LoadingMod && <LoadingModal message={`Transforming properties to ${userName}`}/>}
        </div>
    )
}

export default ChangePropriete

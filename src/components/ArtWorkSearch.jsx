import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../lib/constants';
import ClipLoader from 'react-spinners/ClipLoader'
import { IoWarningOutline } from "react-icons/io5";

const ArtWorkSearch = () => {
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const handleInput = (e) => {
        setId(e.target.value)
    }

    const handleSearch = async () => {
        try {
            setNotFound(false)
            setLoading(true);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const result = await artsChainContract.getArtWorkById(id);
            setTimeout(() => {
                setLoading(false)
                setId('')
                window.open(`http://localhost:5173/artworks/${id}`, '_blank');
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setLoading(false)
                setNotFound(true)
            }, 1000);
            setTimeout(() => {
                setNotFound(false)
            }, 4000);
        }
    };

    return (
        <div className='w-full bg-slate-950 flex flex-col items-center justify-center py-6'>
            <div className="flex items-center justify-center w-1/4 gap-3 ">
                <input
                    className='w-2/3 focus:ring-0'
                    type="text"
                    placeholder="Find an artwork"
                    value={id}
                    onChange={handleInput}
                />
                <button className={`text-white text-base items-center justify-center bg-violet-800 w-1/3 px-4 py-1 rounded-full ${id == '' && 'bg-opacity-30'}`}
                    onClick={handleSearch}
                    disabled={loading || id == ''}>
                    {loading ?
                        <ClipLoader color='#ffffff' size={19} /> :
                        <p>search</p>}
                </button>
            </div>
            {notFound && <p className='w-1/3 bg-red-300 text-sm font-medium tracking-wider rounded-lg mt-3 flex items-center justify-center text-red-600 border border-red-500 p-2'>
                <IoWarningOutline className='mr-2 text-red-700 text-lg'/>Artwork Not Found
            </p>
            }
        </div>
    );
};

export default ArtWorkSearch;

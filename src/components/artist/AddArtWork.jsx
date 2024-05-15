import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import LoadingModal from '../LoadingModal'
import Web3 from 'web3';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import ArtWorkDetails from './ArtWorkDetails';
import { saveHash } from '../db/FireBaseDB';


const AddArtWork = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [artWork, setArtWork] = useState({
        title: "",
        description: "",
        imageurl: "",
        length: "",
        width: ""
    })
    const [uploading, setUploading] = useState(false)
    const [creating, setCreation] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const web3 = new Web3(window.ethereum);
    const [object, setObject] = useState(null)
    const [hash, setHash] = useState('')

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };
    const handleArtWork = (e) => {
        setArtWork({ ...artWork, [e.target.name]: e.target.value });
    };

    const UploadToIPFS = async (file) => {
        try {
            setUploading(true)
            const formData = new FormData();
            formData.append('file', file);
            const imageResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'pinata_api_key': 'e6487e456472a9145ead',
                    'pinata_secret_api_key': 'adfa62664b44714ff59f607c7cdc104df3e2bf367ddd99222b4ab6e92b5cebb1'
                }
            });
            console.log('Image uploaded successfully:', imageResponse.data.IpfsHash);
            setArtWork({ ...artWork, imageurl: imageResponse.data.IpfsHash });
            setUploading(false)
            setCreation(true)

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    useEffect(() => {
        if (creating) {
            addArtWork();
        }
    }, [creating]);

    const checkTransactionStatus = async (transactionHash) => {
        let transactionConfirmed = false;

        while (!transactionConfirmed) {
            try {
                const receipt = await web3.eth.getTransactionReceipt(transactionHash);
                if (receipt && receipt.status) {
                    console.log('La transaction a été confirmée avec succès.');
                    transactionConfirmed = true;
                } else {
                    console.log('La transaction n\'est pas encore confirmée. En attente...');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du reçu de transaction :', error);
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    };
    const addArtWork = async () => {
        try {
            setCreation(true)

            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const result = await artsChainContract.addartwork(artWork.title, artWork.description, artWork.imageurl, artWork.length, artWork.width);

            if (!result.hash) {
                setCreation(false)
                console.log('User rejected action');
                return;
            }
            console.log('Transaction soumise:', result.hash);
            const receipt = await result.wait();
            console.log('Transaction confirmée');

            console.log(result)
            setTimeout(async () => {
                console.log(result)
                console.log(result.hash)
                // await checkTransactionStatus(result.hash)
                const repartwork = await artsChainContract.getLastArtwork()
                console.log("arwork created : ", repartwork)
                saveHash(repartwork.artworkId, result.hash)
                setObject(repartwork)
                setCreation(false)
                setArtWork({
                    title: "",
                    description: "",
                    imageurl: "",
                    length: "",
                    width: ""
                })
                setImageUrl(false)
                setShowDetails(true)
            }, 500);
            console.log('result')
            console.log(result)

            return result;
        } catch (error) {
            return error.message
        }
    }
    

    return (
        <>
            {!showDetails ? <div className='ml-[50px] relative text-white flex flex-col items-start  h-screen px-24 py-10'>
                <span className='flex flex-col gap-1 mb-8'>
                    <p className='text-white text-2xl font-bold tracking-wide '>Add New Plastic Art </p>
                    <p className='text-gray-400 text-sm tracking-wide'>Please provide the necessary information to add a new plastic art piece to your collection</p>
                </span>
               
                <div className='w-full flex items-center h-full justify-center '>
                    <span onClick={handleClick} className='flex flex-col items-center justify-center w-1/2 gap-2 border-dashed border border-gray-400 h-full rounded-lg hover:bg-zinc-800 hover:border-solid cursor-pointer' style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleFileUpload}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        {!imageUrl && (
                            <>
                                <FaUpload className='text-4xl' />
                                <p className='text-sm font-medium tracking-wide'>Drag and Drop your art</p>
                                <p className='text-sm text-gray-400'>Max size 50MB</p>
                            </>
                        )}
                    </span>
                    <span className='flex flex-col w-1/2 items-center justify-center pl-12 gap-5'>
                        <span className='w-full flex flex-col items-start justify-center gap-1'>
                            <p className='text-base text-white font-semibold'>Title</p>
                            <input placeholder='Name your ArtWork'
                                name='title'
                                value={artWork.title}
                                onChange={handleArtWork}
                                type='text' className='w-4/5 text-sm outline-none text-gray-400 bg-zinc-900 rounded-lg px-3 py-1.5 border border-zinc-700 focus:border-zinc-600 focus:ring-0' />
                        </span>
                        <span className='w-full flex flex-col items-start justify-center gap-1 '>
                            <p className='text-base text-white font-semibold'>Dimension</p>
                            <span className='flex items-center justify-between w-4/5'>
                                <input placeholder='length' type='number'
                                    value={artWork.length}
                                    name='length'
                                    onChange={handleArtWork}
                                    className='w-3/5 text-sm outline-none text-gray-400 bg-zinc-900 rounded-lg px-3 py-1.5 border border-zinc-700 focus:border-zinc-600 focus:ring-0' />
                                <p className='w-1/3 text-center'>x</p>
                                <input placeholder='width' type='number'
                                    value={artWork.width}
                                    name='width'
                                    onChange={handleArtWork}
                                    className='w-3/5 text-sm outline-none text-gray-400 bg-zinc-900 rounded-lg px-3 py-1.5 border border-zinc-700 focus:border-zinc-600 focus:ring-0' />
                            </span>
                        </span>
                        <span className='w-full flex flex-col items-start justify-center gap-1'>
                            <p className='text-base text-white font-semibold'>Description</p>
                            <textarea
                                placeholder='Describe Your Art'
                                value={artWork.description}
                                name='description'
                                onChange={handleArtWork}
                                className='w-4/5 h-20 text-sm outline-none text-gray-400 bg-zinc-900 rounded-lg py-1.5 px-3 border border-zinc-700 focus:border-zinc-600 focus:ring-0 resize-none'
                                style={{ alignItems: 'flex-start' }}
                            />
                        </span>
                        
                            <span className='w-3/5 flex justify-center mr-20 mt-3'>
                                <button className='text-base w-3/4 text-black font-semibold tracking-wider bg-white hover:bg-violet-200 rounded-full py-1 px-3  '
                                    onClick={() => UploadToIPFS(fileInputRef.current.files[0])}>
                                    Create
                                </button>
                            </span>
                        


                    </span>

                </div>
                {uploading && <LoadingModal message={'uploading to IPFS'} />}
                {creating && <LoadingModal message={'Your artwork is currently being created'} />}
            </div>
                : <ArtWorkDetails artWork={object} new={true}/>}
        </>
    )
}

export default AddArtWork

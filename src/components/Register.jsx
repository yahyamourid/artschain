import React, { useEffect, useState } from 'react';
import { getWalletDetails, isUserNameExist } from './Auth';
import { IoCloseCircleSharp } from "react-icons/io5";
const Register = ({ onClose, register }) => {
    const [walletAddress, setWalletAddress] = useState('');
    const [activeButton, setActiveButton] = useState(false)
    const [error, setError] = useState(false)
    const [userName, setUserName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('Artist');

    useEffect(() => {
        const fetchWalletAddress = async () => {
            try {
                const address = await getWalletDetails();
                if (address) {
                    setWalletAddress(address);
                } else {
                    console.log('Aucune adresse de portefeuille trouvée.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'adresse du portefeuille :', error);
            }
        };

        fetchWalletAddress();
    }, []);

    useEffect(() => {
        setActiveButton(userName !== '' && firstName !== '' && lastName !== '');
    }, [userName, firstName, lastName]);

    const handleUsername = async (e) => {
        setUserName(e.target.value)
        const result = await isUserNameExist(e.target.value)
        setError(false);
        if (e.target.value === '' || firstName === '' || lastName === '') {
            setActiveButton(false);
        } else if (!result) {
            setActiveButton(true);
        } else {
            setError(true);
            setActiveButton(false);
        }
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50  backdrop-blur-sm">
                <div className="relative flex-col h-5/6 w-2/6 bg-slate-950 border border-opacity-20 border-gray-500 rounded-lg flex items-center justify-start shadow-xl ">
                    <div className='mb-10 text-2xl font-bold tracking-wide bg-slate-500  rounded-t-lg  bg-opacity-10 text-center w-full text-white border-b border-opacity-10 border-b-violet-600 py-3'>
                        Join Us
                    </div>
                    <div className="mb-4 -mt-8  w-3/5">
                        <label htmlFor="name" className="flex flex-col text-xs  text-white mb-1 font-medium tracking-wider">UserName:</label>
                        <input id="name" type="text" placeholder="Choose a username" onChange={handleUsername} value={userName}
                            className="text-white font-normal w-full text-xs bg-slate-950  border border-opacity-20 border-gray-500 hover:bg-gray-900 rounded-lg  px-4 py-2 duration-300 focus:outline-none focus:border-opacity-35 focus:bg-gray-900 " />
                        {error && <p className='text-red-500 text-sm'>userName already exist</p>}
                    </div>
                    <div className="mb-4  w-3/5">
                        <label htmlFor="name" className="flex flex-col text-xs  text-white mb-1 font-medium tracking-wider">FirstName:</label>
                        <input id="firstname" type="text" placeholder="Your first" onChange={handleFirstName} value={firstName}
                            className="text-white font-normal w-full text-xs bg-slate-950 border border-opacity-20 border-gray-500 hover:bg-gray-900 rounded-lg  px-4 py-2 duration-300 focus:outline-none focus:border-opacity-35 focus:bg-gray-900 " />
                    </div>
                    <div className="mb-4  w-3/5">
                        <label htmlFor="name" className="flex flex-col text-xs  text-white mb-1 font-medium tracking-wider">LastName:</label>
                        <input id="firstname" type="text" placeholder="Your lastName" onChange={handleLastName} value={lastName}
                            className="text-white font-normal w-full text-xs bg-slate-950 border border-opacity-20 border-gray-500 hover:bg-gray-900 rounded-lg  px-4 py-2 duration-300 focus:outline-none focus:border-opacity-35 focus:bg-gray-900 " />
                    </div>
                    <div className="flex mb-4 w-3/5 items-center gap-4">
                        <label htmlFor="role" className="flex flex-col text-xs  text-white mb-1 font-medium tracking-wider">Role:</label>
                        <div className="flex items-center">
                            <input className="mr-2 h-4 w-4 text-violet-600 focus:ring-violet-500" type="radio" id="artist" name="role" value="Artist" checked={role === 'Artist'} onChange={handleRoleChange} />
                            <label htmlFor="artist" className="ml-2 text-xs text-white">Artist</label>
                        </div>
                        <div className="flex items-center">
                            <input className="mr-2 h-4 w-4 text-violet-600 focus:ring-violet-500" type="radio" id="client" name="role" value="Client" checked={role === 'Client'} onChange={handleRoleChange} />
                            <label htmlFor="client" className="ml-2 text-xs text-white">Client</label>
                        </div>
                    </div>
                    <div className="mb-4 w-3/5">
                        <label htmlFor="walletAdress" className="block text-xs  text-white mb-1 font-medium tracking-wider">WalletAdress:</label>
                        <input id="walletAdress" type="text" value={walletAddress} readOnly
                            className="text-white font-normal text-xs w-full bg-gray-900 border border-opacity-20 border-gray-500  rounded-lg  px-4 py-2 duration-300 focus:outline-none focus:border-opacity-35 focus:bg-gray-900 " />
                    </div>
                    <button className={`w-3/5 ${activeButton ? 'bg-violet-600 hover:bg-gray-900 ' : 'bg-gray-800'} text-white tracking-widest border border-opacity-20 border-gray-500  rounded-lg  px-4 py-1.5 duration-300`}
                        disabled={!activeButton} onClick={() => register(userName, firstName, lastName, role)}>Register</button>
                    <button className='absolute top-5 right-4 text-white text-xl font-bold hover:text-slate-400'
                        onClick={onClose}>
                        <IoCloseCircleSharp />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;

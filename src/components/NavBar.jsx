import React, { useEffect, useState } from 'react';
import { isMetaMaskInstalled, getWalletDetails, connectToWallet, login, register } from './Auth';
import Register from './Register';
import LoadingModal from './LoadingModal';
import Web3 from 'web3';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiWallet } from "react-icons/gi";



const NavBar = () => {
    const [loading, setLoading] = useState(true);
    const [walletInstalled, setWalletInstalled] = useState(false);
    const [modeRegister, setModeRegister] = useState(false);
    const [userDet, setUserDet] = useState(null);
    const [openRegister, setOpenRegister] = useState(false);
    const [registering, setRegistering] = useState(false)
    const web3 = new Web3(window.ethereum);

    // Fonction pour gérer la déconnexion du portefeuille
    const handleWalletDisconnect = () => {
        localStorage.removeItem("userDet");
        setUserDet(null); // Réinitialiser les détails de l'utilisateur
        window.location.reload(); // Actualiser la page
    };


    const checkState = async () => {
        const user = JSON.parse(localStorage.getItem("userDet"));
        if (user !== null) setUserDet(user);
    };

    const checkWallet = async () => {
        const installed = isMetaMaskInstalled();
        setWalletInstalled(installed);
        if (installed) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setModeRegister(true);
                    await login();
                } else {
                    localStorage.removeItem("userDet");
                    console.log('Aucun compte Metamask connecté.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des comptes Metamask :', error);
            }
        }
        checkState();
        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem("userDet");
        window.location.reload();
    };

    useEffect(() => {
        checkWallet();
    }, []);

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


    const handleLogin = async () => {
        try {
            const lg = await login();
            console.log(lg)
            if (lg === 'logedIn') {
                const user = JSON.parse(localStorage.getItem("userDet"));
                setUserDet(user);
            }
            else if (lg === 'rejected')
                setModeRegister(true);

        } catch (error) {
            console.log(error)
        }


    };

    const handleRegister = async (userName, firstName, lastName) => {
        try {
            const res = await register(userName, firstName, lastName)
            console.log(res)
            if (!res.hash) {
                setOpenRegister(false)
                console.log('User rejected action');
                return;
            }
            setOpenRegister(false)
            setRegistering(true);
            setTimeout(async () => {
                console.log(res.hash)
                await checkTransactionStatus(res.hash)
                await handleLogin();
                setRegistering(false);
                setModeRegister(false)
            }, 3000);
            handleLogin()
        } catch (error) {
            console.log(error)
            setRegistering(false);
            setModeRegister(false)
        }
    };


    const handleRegisterForm = () => {
        setOpenRegister(true);
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    useEffect(() => {
        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                handleWalletDisconnect();
            } else {
                handleLogin();
            }
        };

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);



    return (
        <div className='relative flex items-center justify-between  bg-slate-950 border-b border-b-gray-500 border-opacity-20 px-32 py-4 my-auto '>
            <p className="text-2xl text-white font-extrabold tracking-widest">Arts<span className='text-violet-600'>Chain</span></p>
            <span className="space-x-6 text-sm">
                {loading ? <p>loading</p> :
                    userDet ? (
                        <span className="flex items-center">
                            <p className="text-violet-600 tracking-widest  px-4 py-1.5"><span className='text-white mr-2'>Welcome </span>{userDet.userName}</p>
                            <a href={`/${userDet.role}`}><LuLayoutDashboard className='text-white text-xl'/></a>
                        </span>
                    ) : (
                        !modeRegister ? (
                            <button className="text-white text-sm font-bold tracking-widest border border-opacity-20 border-gray-500 hover:bg-gray-900 rounded-lg  px-4 py-2 duration-300"
                                onClick={() => handleLogin()}>
                                    <span className='flex items-center'>
                                    Connect Wallet <GiWallet className='ml-2 text-lg'/>
                                    </span>
                                </button>
                        ) : (
                            <button className="text-white tracking-widest border border-opacity-20 border-gray-500 hover:bg-gray-900 rounded-lg  px-4 py-1.5 duration-300"
                                onClick={() => handleRegisterForm()}>Register</button>
                        )
                    )
                }
            </span>
            <span className='absolute'>{openRegister && <Register onClose={handleCloseRegister} register={handleRegister} />}</span>
            <span className='absolute'>{registering && <LoadingModal message={"Registering"} />}</span>
        </div>
    );
};

export default NavBar;

"use client"
import React, { useEffect, useState } from 'react';
import { isMetaMaskInstalled, getWalletDetails, connectToWallet, login, register } from './Auth';
import Hero from './Hero';


export default function Welcome() {
  const [loading, setLoading] = useState(true);
  const [walletInstalled, setWalletInstalled] = useState(false);
  const [modeRegister, setModeRegister] = useState(false);
  const [userDet, setUserDet] = useState(null);

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
          await login()
        } else {
          localStorage.removeItem("userDet");
          console.log('Aucun compte Metamask connecté.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des comptes Metamask :', error);
      }
    }
    checkState();
  };

  const logout = () => {
    localStorage.removeItem("userDet");
    window.location.reload();
  }

  useEffect(() => {
    checkWallet();
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    const lg = await login();
    if (lg === 'logedIn') window.location.reload();
    else setModeRegister(true);
  };

  return (
    <main className="w-full">
      <Hero/>
      
    </main>
  );
}

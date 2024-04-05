import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../lib/constants';



const isMetaMaskInstalled = () => {
    if (typeof window !== 'undefined') {
        return typeof window.ethereum !== 'undefined';
    }
    return false;
}

const getWalletDetails = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0] || null;
    } catch (error) {
        console.error('Error getting wallet details:', error);
        return null;
    }
}

const connectToWallet = async () => {
    try {
        await window.ethereum.enable();
        return 'connected';
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        return 'rejected';
    }
}
const register = async (userName,firstName, lastName) => {
    const connectionStatus = await connectToWallet();
    if (connectionStatus === 'connected') {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const result = await artsChainContract.register(userName,firstName, lastName);
            console.log('result')
            
            // console.log(result)
            return result;
        } catch (error) {
            return error.message
        }
    }
}

const login = async () => {
    const connectionStatus = await connectToWallet();
    if (connectionStatus === 'connected') {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const result = await artsChainContract.login();
            const adrress = await getWalletDetails()
            const userDet = ({
                walletAdress: adrress,
                userName: result[0],
                role: result[1]
            })
            console.log(userDet)
            localStorage.setItem("userDet", JSON.stringify(userDet))

            return 'logedIn'
        } catch (error) {
            return 'rejected'
        }
    }
    else return 'notConnected'
}
const isAdminConnected = () => {
    const userDet = localStorage.getItem('userDet');
    if (!userDet || JSON.parse(userDet).role !== 'Admin') {
        window.location.href = '/';
    }
}
const isArtistConnected = () => {
    const userDet = localStorage.getItem('userDet');
    if (!userDet || JSON.parse(userDet).role !== 'Artist') {
        window.location.href = '/';
    }
}

const isUserNameExist = async (userName) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
        const result = await artsChainContract.isUserNameExist(userName)
        return result
    } catch (error) {
        return false;
    }

}
export { isMetaMaskInstalled, getWalletDetails, connectToWallet, login, register, isAdminConnected, isArtistConnected, isUserNameExist };

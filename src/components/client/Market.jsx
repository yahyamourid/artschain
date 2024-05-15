import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const Market = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order is descending

  const getData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
    const result = await artsChainContract.getArtworkForSale();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) * 1000);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedData = [...data].sort((a, b) => {
    // Convert prices to numbers for comparison
    const priceA = parseFloat(a.price.toString());
    const priceB = parseFloat(b.price.toString());
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const filteredData = sortedData.filter(artwork => artwork.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className='text-white w-full flex bg-zinc-900 flex-col items-center min-h-screen  py-6 px-8'>
      <p className='text-3xl font-semibold tracking-wider text-left mr-auto ml-36 mb-10'>Explore the market</p>
      <div className="flex items-center justify-center gap-6 w-3/4 mb-8">
        <input
          type="text"
          placeholder="Search by title"
          className="bg-zinc-900 text-white border hover:bg-zinc-800 border-zinc-600 focus:ring-0 focus:border-zinc-500 rounded-md px-4 py-2"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="flex items-center space-x-2">
          <span>Sort by price:</span>
          <button onClick={handleSort} className="bg-gray-800 text-white mt-0.5 px-3 py-1 rounded-md">
            {sortOrder === 'asc' ? <IoIosArrowUp/>: <IoIosArrowDown/>}
          </button>
        </div>
      </div>
      {loading ? (
        <p>loading</p>
      ) : (
        <div className="w-3/4 grid grid-cols-4 gap-5">
          {filteredData.map((artwork, index) => (
            <a href={`http://localhost:5173/artworks/${artwork[3]}`} key={index} target="_blank" rel="noopener noreferrer">
              <div className='relative group bg-red-300 border border-orange-600 w-full h-52 cursor-pointer rounded-lg p-4 hover:scale-95 duration-500 flex flex-col justify-between' style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${artwork.imageUrl})`, backgroundSize: 'cover' }}>
                <div className='absolute group-hover:opacity-0 text-xs bottom-2  mx-auto bg-zinc-950 bg-opacity-70 p-2 rounded-b-lg'>
                  <p className='text-white text-base font-semibold'>{artwork.title}</p>
                  <p>{formatDate(artwork.timestamp)}</p>
                  <p>{artwork[10]} x {artwork.width}</p>
                </div>
                <p className='absolute top-0 group-hover:opacity-0 right-0 text-xs bg-orange-600 text-white font-semibold rounded-tr-md px-4'>{artwork.price.toString()} MAD</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Market;

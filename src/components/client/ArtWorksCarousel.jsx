import React, { useState, useEffect } from 'react';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
const ArtworksCarousel = (props) => {
    const artWorks = props.artWorks
    const [startIndex, setStartIndex] = useState(0);



    const handleNext = () => {
        const newStartIndex = startIndex + 4;
        setStartIndex(newStartIndex >= artWorks.length ? 0 : newStartIndex);
    };

    const handlePrev = () => {
        const newStartIndex = startIndex - 4;
        setStartIndex(newStartIndex < 0 ? artWorks.length - 4 : newStartIndex);
    };
    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp) * 1000);

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    }

    const handelArtWorkDetails = (object) => {
        props.setArtWork(object)
        props.showArtWork(true)
    }
    return (
        <div className='relative flex items-center justify-center h-1/2 w-full py-6 gap-5'>
            <div className='flex gap-4 overflow-x-auto w-full h-full'>
                {artWorks.slice(startIndex, startIndex + 4).map((artwork, index) => (
                    <div key={index} className='relative group flex border border-orange-600 items-end justify-center w-1/4 h-full cursor-pointer rounded-lg p-4 hover:scale-95 duration-500 ' style={{ backgroundImage: `url(https://gateway.pinata.cloud/ipfs/${artwork.imageUrl})`, backgroundSize: 'cover' }}
                        onClick={() => handelArtWorkDetails(artwork)}>
                        <span className='flex text-xs text-zinc-400 font-medium flex-col group-hover:opacity-0 duration-500 justify-start w-full bg-opacity-70 bg-zinc-950 py-1 pl-1 gap-0.5 rounded-tr-2xl rounded-bl-2xl'>
                            <p className='text-white text-base font-semibold'>{artwork.title}</p>
                            <p>{formatDate(artwork.timestamp)}</p>
                            <p>{artwork[10]} x {artwork.width}</p>
                        </span>
                        {artwork.forSale  && <p className='absolute group-hover:opacity-0 top-0 right-0 text-xs bg-orange-600 text-white font-semibold rounded-tr-md px-4'>for sale</p>}
                    </div>
                ))}
            </div>
            <button onClick={handleNext} className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl hover:text-orange-700 duration-300 text-white px-3 py-1 rounded-lg ${startIndex + 4 >= artWorks.length && 'opacity-50 cursor-not-allowed'}`} disabled={startIndex + 4 >= artWorks.length}>
                <BsArrowRightCircleFill />
            </button>
            <button onClick={handlePrev} className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl hover:text-orange-700 duration-300 text-white px-3 py-1 rounded-lg ${startIndex === 0 && 'opacity-50 cursor-not-allowed'}`} disabled={startIndex === 0}>
                <BsArrowLeftCircleFill />
            </button>
        </div>
    );
};
export default ArtworksCarousel;

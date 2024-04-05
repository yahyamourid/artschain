import React from 'react'
import goat from '../assets/goat.jpeg'
import lion from '../assets/lion.jpeg'
import mountain from '../assets/mountain.jpeg'
import savana from '../assets/savana.jpeg'
const WeTheBest = () => {
    return (
        <div className='flex justify-center w-full bg-slate-950 min-h-screen max-h-screen overflow-hidden px-32'>
            <div className="grid grid-cols-2 w-1/2 p-5 gap-4 my-auto items-center justify-center ">
                <img src={goat} className='rounded-lg hover:scale-95 duration-500' />
                <img src={mountain} className='rounded-lg hover:scale-95 duration-500' />
                <img src={savana} className='rounded-lg hover:scale-95 duration-500' />
                <img src={lion} className='rounded-lg hover:scale-95 duration-500' />
            </div>
            <div className="flex flex-col justify-center items-start w-1/2 pl-5">
                <p className='text-white text-4xl font-extrabold tracking-wider'>We Give The Best <span className='text-pink-700'>Certification</span> Service For You</p>
                <p className='text-gray-400 text-base font-normal tracking-wide'>We give the best service in ensuring the authenticity and provenance of fine art through
                    blockchain technology. Elevate your art certification process with unparalleled security,
                    transparency, and trust. Join us in revolutionizing the art world, one blockchain-certified
                    masterpiece at a time
                </p>
            </div>

        </div>
    )
}

export default WeTheBest

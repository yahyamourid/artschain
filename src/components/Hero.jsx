import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from './NavBar'
import hero from '../assets/hero.jpeg'
import { FaUsers , FaMagic} from "react-icons/fa";
const Hero = () => {
    const [opacity, setOpacity] = useState(90); // Opacité initiale

    useEffect(() => {
        // Fonction pour animer l'opacité de manière infinie
        const intervalId = setInterval(() => {
            // Augmentation de l'opacité
            setOpacity(prevOpacity => (prevOpacity === 100 ? 0 : prevOpacity + 10));
        }, 1000); // Interval de 1 seconde pour l'animation

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className='relative flex    items-center bg-slate-950 min-h-screen min-w-full h-screen overflow-hidden  px-32'>
            <span className='absolute top-0 w-full right-0 z-50'>
                <NavBar />
            </span>
            <div className="flex flex-col justify-center items-start w-3/5 h-3/4  space-y-8 z-40">
                <h1 className='text-5xl text-transparent bg-gradient-to-r from-violet-700 to-violet-200 bg-clip-text font-extrabold tracking-wider '>Plastic Arts Certification Platform</h1>
                <p className='text-base text-gray-300 font-semibold tracking-widest'>Explore our platform to certify your artistic creations using blockchain technology.</p>
                <div className="flex items-center justify-center gap-20">
                    {/* <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 m-1 to-violet-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <button class="relative px-10 py-3 bg-slate-950 rounded-lg leading-none flex items-center ">
                        <span class="text-violet-700 font-semibold group-hover:text-gray-100 transition duration-200">Discover &rarr;</span>
                    </button> */}
                    <span className='flex flex-col items-center  text-gray-300 mt-4 gap-1'>
                        <p className='text-3xl tracking-wide font-bold'>30+</p>
                        <span className='text-lg  flex items-center '>
                            <FaUsers />
                            <p className='ml-1 tracking-widest font-medium'>Artist</p>
                        </span>
                    </span>
                    <span className='flex flex-col items-center  text-gray-300 mt-4 gap-1'>
                        <p className='text-3xl tracking-wide font-bold'>100+</p>
                        <span className='text-lg  flex items-center '>
                            <FaMagic />
                            <p className='ml-1 tracking-widest font-medium'>Arts</p>
                        </span>
                    </span>
                </div>
            </div>
            <div className="flex w-2/5 items-center justify-center relative group mt-10 ">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg blur opacity-75 -m-1.5 group-hover:opacity-100 transition duration-2000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative ">
                    <img src={hero} className='rounded-lg' alt="Votre image" />
                    <div className="absolute inset-0 rounded-lg bg-slate-950 opacity-80 animate-pulse" style={{ animationDuration: '4s' }}></div>
                </div>
            </div>


            {/*  <span className='absolute  bg-[#452275] h-[600px] w-[800px] opacity-20 rounded-full z-40 -top-44 -left-36 filter blur-3xl'></span> */}
        </div>
    )
}

export default Hero

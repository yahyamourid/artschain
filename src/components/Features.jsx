import React from 'react'
import features from '../../lib/svgFeatures'
const Features = () => {
    return (
        <div className='relative flex flex-col py-11 items-center bg-slate-950 justify-center space-y-1 min-h-screen w-full min-w-full h-screen overflow-hidden px-20'>
            <p className="text-white font-bold text-4xl tracking-widest">Key Features</p>
            <div className="flex h-5/6 w-full p-4 gap-3 bg-slate-950 items-center" >
                
                <span className="relative z-20 group flex flex-col items-center mx-2 w-1/3 h-2/5  gap-1  hover:bg-gray-950 hover:border-violet-800   py-3 px-5  bg-zinc-600 bg-opacity-10 hover:border hover:border-opacity-20 rounded-lg">
                    <svg className='absolute -top-6 w-1/6 bg-violet-600 text-white rounded-full p-0.5  group-hover:scale-125 duration-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 className="text-lg font-semibold text-white group-hover:text-violet-700 mb-1 mt-6">Transparent Certification</h1>
                    <p className="text-sm text-gray-500 text-justify">With blockchain technology, each certification is transparent, immutable, and verifiable</p>
                </span>
                <span className="relative z-20 group w-1/3 h-2/5 flex flex-col items-center mx-2  gap-1 hover:bg-gray-950 hover:border-sky-800  py-3 px-5 bg-zinc-600 bg-opacity-10 hover:border hover:border-opacity-20 rounded-lg">
                    <svg className='absolute -top-6 w-1/6 bg-sky-700 text-white rounded-full p-1 group-hover:scale-125 duration-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <h1 className="text-lg font-semibold text-white group-hover:text-sky-700 mb-1 mt-6">Enhanced Security</h1>
                    <p className="text-sm text-gray-500 text-justify">Blockchain ensures the security of your artworks against counterfeiting and tampering.</p>
                </span>
                <span className="relative z-20 group w-1/3 h-2/5 flex flex-col items-center mx-2  gap-1 hover:bg-gray-950 hover:border-pink-800  py-3 px-5 bg-zinc-600 bg-opacity-10 hover:border hover:border-opacity-20  rounded-lg">
                    <svg className='absolute -top-6 w-1/6 bg-pink-700 text-white rounded-full p-1 group-hover:scale-125 duration-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <h1 className="text-md font-semibold text-white group-hover:text-pink-700 mb-1 mt-6">Simplified Process</h1>
                    <p className="text-sm text-gray-500 text-justify">Our platform simplifies the process of plastic arts certification for artists and collectors.</p>
                </span>
            </div>
        </div>
    )
}

export default Features

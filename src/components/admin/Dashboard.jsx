import React from 'react'
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';
import { useEffect, useState } from 'react';
import { IoHome } from "react-icons/io5";
import Numbers from './Numbers';
import Transactions from './Transactions';
import LastTransaction from './LastTransaction';
import BestArtist from './BestArtist';
import Dunat from './Dunat';
import Chart from './Chart';

const Dashboard = () => {

    return (
        <div className='flex flex-col w-full  text-white h-full  py-2 px-8'>
            {/* top */}
            <div className="flex items-center justify-between ">
                <p className='ml-2 text-2xl font-bold'>OverView</p>
                <p className='font-medium flex items-center'>
                    Welcome <span className='text-violet-600 ml-1'>Admin</span>
                    <a href='http://localhost:5173'>
                        <IoHome className='text-xl ml-3 hover:scale-110 duration-500 hover:text-violet-600' />
                    </a>
                </p>
            </div>

            {/* Dashboard */}
            <div className="flex w-full h-full  gap-3 my-4">
                <div className="flex flex-col w-4/5 h-full gap-3">
                    <div className="w-full h-1/4  gap-3">
                        <Numbers/>
                    </div>
                    <div className="flex w-full h-3/4 gap-3 ">
                        <div className="w-1/2 h-full ">
                            <Transactions/>
                        </div>
                        <div className="w-1/2 h-full ">
                            <Chart/>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col w-1/5 h-full gap-3">
                    <div className="w-full h-2/5 ">
                        <LastTransaction/>
                    </div>
                    <div className="w-full h-1/3 ">
                        <BestArtist/>
                    </div>
                    <div className="w-full h-1/3 ">
                        <Dunat/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard

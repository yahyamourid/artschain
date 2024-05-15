import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';

const NewChartComponent = () => {
    const [forSale, setForSale] = useState(0);
    const [notSale, setNotSale] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
            const rep = await artsChainContract.getData();
            setForSale(Number(rep[3]));
            setNotSale(Number(rep[2] - rep[3]));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            const chartElement = document.getElementById('myChart');
            if (chartElement) {
                new Chart(chartElement, {
                    type: 'doughnut',
                    data: {
                      labels: ['For Sale', 'Not for Sale'],
                      datasets: [{
                        data: [forSale, notSale],
                        backgroundColor: ['#F7F733', '#952ADF'],
                        hoverBackgroundColor: ['#F7F733', '#952ADF'],
                      }]
                    },
                    options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: {
                        animateRotate: true,
                        animateScale: true,
                      },
                      elements: {
                        arc: {
                          borderWidth: 0, // Supprimer les bordures des segments
                        },
                      },
                    },
                  });
            }
        }
    }, [forSale, notSale, loading, error]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='w-full h-full bg-zinc-800 rounded-lg p-1'>
            <canvas className='h-full w-3/4' id="myChart" width={300} height={300} />
        </div>
    );
};

export default NewChartComponent;

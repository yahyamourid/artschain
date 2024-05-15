import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { ethers } from 'ethers';
import { contractAdress, contractABI } from '../../../lib/constants';

const ChartComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const artsChainContract = new ethers.Contract(contractAdress, contractABI, signer);
      const rep = await artsChainContract.getAllTransactions();
      setTransactions(rep);
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
      const filteredTransactions = transactions.filter(transaction => {
        // Date et heure actuelles moins cinq jours en millisecondes
        const fiveDaysAgo = Date.now() - (5 * 24 * 60 * 60 * 1000);
        // Date de la transaction convertie en millisecondes
        const transactionDate = Number(transaction[4]) * 1000;
        return transactionDate >= fiveDaysAgo;
      });

      const transactionCountByDay = {};
      filteredTransactions.forEach(transaction => {
        // Date de la transaction convertie en millisecondes
        const transactionDate = Number(transaction[4]) * 1000;
        // Date de la transaction en format JJ/MM/AAAA
        const transactionDay = new Date(transactionDate).toLocaleDateString('en-GB');
        // Incrémenter le compteur de transactions pour cette journée
        transactionCountByDay[transactionDay] = (transactionCountByDay[transactionDay] || 0) + 1;
      });

      // Extraire les dates et le nombre de transactions pour les cinq derniers jours
      const labels = [];
      const data = [];
      for (let i = 4; i >= 0; i--) {
        const date = new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB');
        labels.push(date);
        data.push(transactionCountByDay[date] || 0);
      }

      // Créer le graphique
      const chartElement = document.getElementById('myChart2');
      if (chartElement) {
        new Chart(chartElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Transactions',
              data: data,
              backgroundColor: 'rgba(149, 42, 223, 0.5)',
              borderColor: 'rgba(149, 42, 223, 1)',
              borderWidth: 1,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [transactions, loading, error]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='w-full h-full bg-zinc-800 rounded-lg p-1'>
      <canvas className='h-full w-3/4' id="myChart2" width={300} height={300} />
    </div>
  );
};

export default ChartComponent;

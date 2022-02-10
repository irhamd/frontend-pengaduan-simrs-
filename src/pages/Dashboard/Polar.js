import React from 'react';
import {
  Chart as ChartJS,
  
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';


export const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};


ChartJS.register( ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Nifas', 'Irna', 'IGD', 'Poli', 'Penunjang', 'Lain-lain'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 13, 15, 9, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(30, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 100, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

export  default function Polar() {
  return <PolarArea data={data} options={options} />;
}

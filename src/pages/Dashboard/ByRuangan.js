import React, { useEffect, useState } from 'react';
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



export  default function ByRuangan(pr) {

  const [ruangan, setruangan] = useState([]);
  const [jumlah, setjumlah] = useState([]);

  useEffect(() => {
    pr.byruangan.map((datas) => {
        setjumlah((jumlah) => [...jumlah, datas.jumlah]);
        setruangan((ruangan) => [...ruangan, datas.unitkerja]);
      });
  }, []);



  const data = {
    labels: ruangan,
    datasets: [
      {
        label: '',
        data: jumlah,
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





  return (
    <div>
      <PolarArea data={data} options={options} />;
    </div>
  ) 
}

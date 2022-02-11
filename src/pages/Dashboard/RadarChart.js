import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};



export default function  RadarChart(pr) {

  const [kasus, setkasus] = useState([]);
  const [jumlah, setjumlah] = useState([]);

  useEffect(() => {
    pr.bykasus.map((datas) => {
        setjumlah((jumlah) => [...jumlah, datas.jumlah]);
        setkasus((kasus) => [...kasus, datas.kategory]);
      });
  }, []);


  const data = {
    labels: kasus,
    datasets: [
      {
        label:"Kasus",
        data: jumlah,
        backgroundColor: '#fd7e1494',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 0.3,
      },
    ],
  };

  return (
    <div>
      <Radar data={data} style={{marginTop:"-40px"}} options={options}/>
    </div>

  ) 
}

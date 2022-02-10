import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import img from "../../assets/img/photos/photo1.jpg"
// import { Image } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);


export const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };


export const data = {
    labels: ['Athar', 'Rebahan', 'Ridwan', 'Nanang', 'Rattih', 'Irham'],
    datasets: [
        {
            label: '',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],

            borderWidth: 0.3,
        },
    ],
};

export default function Pie() {
    return (
        <div>
            <Doughnut data={data}  options={options} />;
        </div>
    )
}

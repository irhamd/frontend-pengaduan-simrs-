import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import img from "../../assets/img/photos/photo1.jpg"
// import { Image } from 'antd';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Pie(pr) {

    const [nama, setnama] = useState([]);
    const [jumlah, setjumlah] = useState([]);

useEffect(() => {
    pr.bypetugas.map((datas) => {
        setjumlah((jumlah) => [...jumlah, datas.jumlah]);
        setnama((nama) => [...nama, datas.namapegawai]);
      });
}, []);



    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };
    
    
    const data = {
        labels: nama,
        datasets: [
            {
                label: '',
                data: jumlah,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    '#D2691E',
                    '#FFFAF0',
                    '#ADFF2F',
                    '#3CB371',
                    '#E0FFFF',
                    '#6B8E23',
                    '#A9A9A9'
                ],
    
                borderWidth: 0.3,
            },
        ],
    };

    
    return (
        <div>
            {/* <p> {JSON.stringify(nama)} </p> */}
            <Doughnut data={data} options={options} />;
        </div>
    )
}

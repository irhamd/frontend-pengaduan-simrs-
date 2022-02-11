import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";

function ChartBar(pr) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
       const options = {
        plugins: {
          title: {
            display: false,
          },
        },
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

      
    const labels =  pr.labels
    const data = {
        labels,
        datasets: [

            {
                label: "Pengaduan Selesai",
                data:pr.selesai,
                backgroundColor: "#0f9a53",
                stack: "Stack 0",
            },

            {
                label: "Pengaduan Pending",
                data: pr.pending,
                backgroundColor: "#fd7e14",
                stack: "Stack 0",
            },
            {
                label: "Dialihkan",
                data: [],
                backgroundColor: "orangered",
                stack: "Stack 0",
            },
        ],
    };

    return (
        <div>
            <Bar height={70} options={options} data={data} />

        </div>
    )
}

export default ChartBar
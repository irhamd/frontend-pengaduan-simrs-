import React from 'react';
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

export const data = {
  labels: ['Simrs Error', 'Jaringan Trouble', 'Perlengkapan Kantor Bermasalah', 'Lain-lain','PC Trouble'],
  datasets: [
    {
      label:"Kasus",
      data: [8, 9, 13, 3,20],
      backgroundColor: '#fd7e1494',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 0.3,
    },
  ],
};

export default function  RadarChart() {
  return <Radar data={data} />;
}

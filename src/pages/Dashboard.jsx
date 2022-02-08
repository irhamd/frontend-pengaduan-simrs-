import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import _MainLayouts from "../layouts/_MainLayouts";
import { _Col, _Row } from "../services/Forms/LayoutBootstrap";
import _Nav from "../layouts/_Nav";

import background from "../assets/img/bg3.png";
import Pie from "./Dashboard/Pie";
import Polar from "./Dashboard/Polar";
import Radar from "./Dashboard/RadarChart";
import RadarChart from "./Dashboard/RadarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,29,30
];

export const data = {
  labels,
  datasets: [
    {
      label: "Pengaduan Selesai",
      data: [10, 20, 10, 30, 10,50,11,16,40,10,50,10,50,60,70,80,30,70,9,20,50,50,40,20,40,20,10,6,8,10],
      backgroundColor: "#0f9a53",
      stack: "Stack 0",
    },
    {
      label: "Pengaduan Pending",
      data: [1, 0, 0, 3, 0,5,2,0,4,0,5,1,5,6,7,3,3,7,3,2,5,0,4,2,4,2,1,6,8,1],
      backgroundColor: "#fd7e14",
      stack: "Stack 0",
    },
    {
      label: "Tidak Direspond",
      data: [-0, -0, -10, 0, -1,0,0,0,0,0,0,0,0,-15,0,0,-20,0,],
      backgroundColor: "orangered",
      stack: "Stack 0",
    },
  ],
};

function Dashboard() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
      }}
    >
      <_Nav />
      <_Row>
        <_Col sm={12} style={{ padding: "20px 100px" }}>
          <h4 className="titlechart">
            DATA PENGADUAN DALAM 30 HARI TERAKHIR
          </h4>
          <Bar height={70} options={options} data={data} redraw />
        </_Col>
        <_Col sm={4} style={{ padding: "20px 100px" }}>
          <h4 className="titlechart">
            DATA PENGADUAN BERDASARKAN PETUGAS
          </h4>

          <Pie />
        </_Col>
        <_Col sm={4} style={{ padding: "20px 100px" }}>
          <h4 className="titlechart">
            BERDASARKAN RUANGAN
          </h4>
          <Polar />
        </_Col>
        <_Col sm={4} style={{ padding: "20px 50px" }}>
          <h4 className="titlechart">
            BERDASARKAN KASUS
          </h4>

          <RadarChart />
        </_Col>
        <_Col sm={5}>
          <Line
            datasetIdKey="id"
            data={{
              labels: ["Jun", "Jul", "Aug"],
              datasets: [
                {
                  id: 1,
                  label: "",
                  data: [5, 6, 7],
                },
                {
                  id: 2,
                  label: "",
                  data: [4, 12, 91],
                },
              ],
            }}
          />
        </_Col>
      </_Row>
    </div>
  );
}

export default Dashboard;

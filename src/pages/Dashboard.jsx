import React, { useEffect, useState } from "react";

import _MainLayouts from "../layouts/_MainLayouts";
import { _Col, _Row } from "../services/Forms/LayoutBootstrap";
import _Nav from "../layouts/_Nav";
import { Button, Spin } from "antd";
import background from "../assets/img/bg3.png";
import call from "../assets/img/phone-call.png";
import phone from "../assets/img/phone.png";
import total from "../assets/img/total.png";
import done from "../assets/img/done.png";
import alihkan from "../assets/img/alihkan.png";
import Pie from "./Dashboard/Pie";
import Polar from "./Dashboard/Polar";
import Radar from "./Dashboard/RadarChart";
import RadarChart from "./Dashboard/RadarChart";
import { Link } from "react-router-dom";
import { _Button, _Date } from "../services/Forms/Forms";
import _Api from "../services/Api/_Api";
import { BarChart } from "recharts";
import ChartBar from "./Dashboard/ChartBar";
import moment from "moment";

function CekRender(pr) {
  const info = {
    background: pr.color,
    borderRadius: "3px",
    marginLeft: "15px",
    marginTop: "5px",
  };
  return (
    <_Col sm={2} style={info}>
      <_Row>
        <_Col
          sm={4}
          style={{
            background: "#ffd685fa",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <img height={40} src={pr.src} />
        </_Col>
        <_Col>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "-5px",
              fontFamily: "BrothersCircus",
            }}
          >
            {pr.kasus} kasus
          </p>
          <p> {pr.jenis} </p>
        </_Col>
      </_Row>
    </_Col>
  );
}
function Dashboard() {
  const [loadingDel, setloadingDel] = useState(false);
  const [alldata, setalldata] = useState(null);
  const [tgl, settgl] = useState([]);
  const [selesai, setselesai] = useState([]);
  const [pending, setpending] = useState([]);
  const [tglawal, settglawal] = useState(moment());
  const [tglakhir, settglakhir] = useState(moment());
  const [bypetugas, setbypetugas] = useState([]);
  const [byruangan, setbyruangan] = useState([]);

  const loadData = () => {
    settgl([]);
    setloadingDel(true);
    _Api
      .get(`pengaduan-dashboard-get?tglawal=${tglawal}&tglakhir=${tglakhir}`)
      .then((res) => {
        setalldata(res.data);
        res.data.chart.map((datas) => {
          setselesai((selesai) => [...selesai, datas.selesai]);
          setpending((pending) => [...pending, datas.pending]);
          settgl((tgl) => [...tgl, datas.tgl]);
        });
        setbypetugas([]);
        setbypetugas(res.data.bypetugas);

        setbyruangan([]);
        setbyruangan(res.data.byruangan);

        setalldata(res.data);
        setloadingDel(false);
      });
  };

  useEffect(() => {
    // loadCombo();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "repeat",
      }}
    >
      <_Nav />
      <_Row style={{ padding: "10px 100px" }}>
        <_Row style={{ itemAlign: "center" }}>
          <CekRender
            kasus={alldata && alldata.count[0].jumlah}
            jenis="Total Kasus"
            src={total}
            color="#ffa50085"
          />
          <CekRender kasus="20" jenis="By Call" src={call} color="#ffa50085" />
          <CekRender
            kasus={alldata && alldata.count[0].byapp}
            jenis="By Aplikasi"
            src={phone}
            color="#ffa50085"
          />
          <CekRender
            kasus={alldata && alldata.count[0].selesai}
            jenis="Selesai"
            src={done}
            color="#2ba662b3"
          />
          <CekRender
            kasus={alldata && alldata.count[0].pending}
            jenis="Pending"
            src={alihkan}
            color="#ffa50085"
          />

          <_Col sm={12}>
            <br />
            <_Row>
              <_Col sm={3}>
                <_Date
                  label="Tanggal"
                  format={"DD/MM/YYYY"}
                  name="tgl_survey"
                  onChange={(e) => settglawal(moment(e).format("yyyy-MM-DD"))}
                  required
                />
              </_Col>
              <_Col sm={3}>
                <_Date
                  label={"s/d"}
                  format={"DD/MM/YYYY"}
                  name="tgl_survey"
                  onChange={(e) => settglakhir(moment(e).format("yyyy-MM-DD"))}
                />
              </_Col>

              <_Col sm={1}>
                <_Button
                  size={"small"}
                  label="Find"
                  btnFind
                  onClick={loadData}
                />
              </_Col>
            </_Row>
          </_Col>
        </_Row>
        <_Col sm={12} style={{ padding: "20px 5%" }}>
          <h4 className="titlechart">DATA PENGADUAN DALAM 30 HARI TERAKHIR</h4>
          {alldata && (
            <ChartBar labels={tgl} selesai={selesai} pending={pending} />
          )}
        </_Col>
        <_Col sm={4} style={{ padding: "20px 5%" }}>
          <h4 className="titlechart">BERDASARKAN PETUGAS</h4>
          {alldata && <Pie bypetugas={bypetugas} />}
        </_Col>
        <_Col sm={4} style={{ padding: "20px 5%" }}>
          <h4 className="titlechart">BERDASARKAN RUANGAN</h4>

          {alldata && <Polar byruangan={byruangan} />}
        </_Col>
        <_Col sm={4} style={{ padding: "20px 5%" }}>
          <h4 className="titlechart">BERDASARKAN KASUS</h4>

          {alldata && <RadarChart bykasus={byruangan} />}
        </_Col>
        {/* <p> <link to="home">  <span> KEMBALI KE MENU </span> </link> </p> */}
        <p>
          <Link to="home">
            <Button type="primary"> KEMBALI KE MENU </Button>
          </Link>
        </p>
      </_Row>
    </div>
  );
}

export default Dashboard;

import React from "react";
import srcAvatar from "../assets/img/avatars/avatar.jpg";
import { dataUser } from "../services/Cache/Auth";
import { Image, Menu } from 'antd';
import { Link } from "react-router-dom";

import { UserSwitchOutlined, LogoutOutlined, BarChartOutlined, FileProtectOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { _Col, _Row } from "../services/Forms/LayoutBootstrap";

import logo1 from './../assets/img/icons/logo1.png'
import logo2 from './../assets/img/icons/logo2.png'
import logo3 from './../assets/img/icons/logo3.png'
import logo4 from './../assets/img/icons/logo4.png'
import { globalText } from "../services/Text/GlobalText";
import { routes, routes_admin } from "../routing/routes";
import { Cache } from "../services/Cache";

function _Nav() {
  const { SubMenu } = Menu;

  var rout = []
  var ses = Cache.get(globalText.x_auth_resu)
  var auth = {}
  if (ses) {
    auth = JSON.parse(ses)
    rout = auth.role == 'Dosen' ? routes : routes_admin
    // if(auth.role == 'Dosen') rout = routes_admin else 
  }

  const stile = {
    menu: {
      float: "right", right: "0px", background: "#094783", color: "whitesmoke", position: "absolute", borderWidth: "20px", borderStyle: "revert", fontWeight: "bold"
    }
  }


  // const renderroute = rout.map((item, i) => {
  //   return (
  //     <Menu.Item key={i} icon={<MenuUnfoldOutlined />} key={i}> <Link to={`${item.to}`}> {item.title} </Link></Menu.Item>

  //   );
  // });

  return (
    <_Row style={{ background: "#0F9A53", zIndex: "999", marginTop: "10px" }}>
      <_Col sm={10} style={{ float: "right", padding: "5px 30px", display: "flex" }}>
        <img height={50} src={logo1} />
        <h3 style={{ fontFamily: "arial", fontWeight: "bolder", color: "#ebdbdb", marginLeft: "20px" }}> SIMPEL (SISTEM INFORMASI PELAYANAN SIMRS) </h3> <br />
        <p style={{ position: "relative", fontSize :"18px", fontWeight :"bold",  left: "-500px", top: "20px" }} > RSUD Kota Mataram </p>
      </_Col>
      <_Col >
        <div style={{ backgroundImage: "linear-gradient(to right, #0f9a53 10% , #10d972 30%)", marginRight: "-10px", height: "100%", padding: "10px", display: "flex" }}>

          <img height={40} src={dataUser.profile_image}  /> &nbsp;
          <p style={{ marginTop: "5px" }}> <b> {dataUser.nama} </b> </p>
        </div>
      </_Col>

    </_Row>

  );
}

export default _Nav;

import React, { useState } from "react";
import srcAvatar from "../assets/img/avatars/avatar.jpg";
import { dataUser } from "../services/Cache/Auth";
import { Button, Image, Menu, Popover } from 'antd';
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
import { _Button } from "../services/Forms/Forms";

function _Nav() {
  const { SubMenu } = Menu;

  const [showlogout, setshowlogout] = useState(false)

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
    <_Row style={{ background: "#0F9A53", zIndex: "999", marginTop: "10px", height :"50px" }}>
      <_Col sm={10} style={{ float: "right", display: "flex" }}>
        <_Row style={{ width: "100%" }}>

          <_Col sm={12} style={{ display: "flex" }}>
            <div style={{ float: "right", paddingTop: "3px", marginRight: "10px" }}>
              <img height={40} src={logo1} />
            </div>
            <div>
              <p style={{ fontFamily: "arial", fontWeight: "bolder", fontSize: "20px", color: "#ebdbdb", width: "100%" }}> SIMPEL <span className="inilabel"> (SISTEM INFORMASI PELAYANAN SIMRS) </span> </p>
              <p style={{ marginTop: "-27px" }} > RSUD Kota Mataram </p>
            </div>
           
          </_Col>

        </_Row>

      </_Col >

      {/* <_Col sm={2} className="userMenu" style={{height :"50px"}}>
        <Popover
          content={<Link to="/login" > <Button style={{ borderColor: "white" }} icon={<LogoutOutlined />}>  Logout </Button> </Link>}
          // title="Title"
          trigger="click"
          visible={showlogout}
          onVisibleChange={() => setshowlogout(!showlogout)}
        >
          <div style={{
            backgroundImage: "linear-gradient(to right, #0f9a53 10% , yellow 20%)", cursor: "pointer",
            marginRight: "-20px", paddingTop: "5px", height: "100%", paddingLeft: "100px", display: "flex"
          }}>

            <Image height={40} src={dataUser.profile_image} preview={false} /> &nbsp;
            <p style={{ marginTop: "5px" }}> <b> {dataUser.nama} </b> </p>
          </div>
        </Popover>
      </_Col> */}
    </_Row >

  );
}

export default _Nav;

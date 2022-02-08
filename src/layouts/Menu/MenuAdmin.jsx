import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes, routes_admin } from "../../routing/routes";
import { Cache } from "../../services/Cache";
import { globalText } from "../../services/Text/GlobalText";
import { Menu, Button } from 'antd';

import {
  AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  FileDoneOutlined,
  SlidersOutlined,
  DatabaseOutlined,
  AlignRightOutlined,
  BarChartOutlined,
  LogoutOutlined,
  CopyOutlined,
} from '@ant-design/icons';

// import logo1 from './../assets/img/icons/logo1.png'
// import logo2 from './../assets/img/icons/logo2.png'
// import logo3 from './../assets/img/icons/logo3.png'
// import logo4 from './../assets/img/icons/logo4.png'
import { useState } from "react";

function MenuAdmin() {

  const [collapsed, setcollapsed] = useState(false)
 
  const { SubMenu, Item } = Menu;

  return (
    <div style={{ width: 256 }}>
     
      <Menu
        defaultOpenKeys={['sub2', 'sub3', 'sub4']}
        mode="inline"
        theme="dark"
        style={{ background: "#4b545c", color: "white", fontWeight: "bold", fontFamily: "arial" }}
        inlineCollapsed={collapsed}
      >
        <Item key="1" icon={<BarChartOutlined />}>
          <Link to="/dashboard" > Dashboard </Link>
        </Item>


        <SubMenu key="sub3" icon={<SlidersOutlined />} title="Pengaduan">
          <Item icon={<AlignRightOutlined />} key="sub3_1"> <Link to="InputPengaduan" > Input Pengaduan </Link></Item>
          <Item icon={<AlignRightOutlined />} key="sub3_2"> <Link to="/Pengaduan" > Data Pengaduan </Link></Item>

        </SubMenu>


        <SubMenu key="sub4" icon={<CopyOutlined />} title="Pelaporan">
          <Item icon={<AlignRightOutlined />} key="sub3_2"> <Link to="/Laporan" > Laporan </Link></Item>
        </SubMenu>

        <Item key="672" icon={<PieChartOutlined />}>
          Ruangan
        </Item>
        <Item key="67223" icon={<LogoutOutlined />}>
          <Link to="login" > Logout </Link>
        </Item>
      </Menu>
    </div>
  );
}

export default MenuAdmin;

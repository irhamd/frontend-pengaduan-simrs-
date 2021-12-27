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
} from '@ant-design/icons';

// import logo1 from './../assets/img/icons/logo1.png'
// import logo2 from './../assets/img/icons/logo2.png'
// import logo3 from './../assets/img/icons/logo3.png'
// import logo4 from './../assets/img/icons/logo4.png'
import { useState } from "react";

function MenuPetugasPasar() {
  var rout = []
  var ses = Cache.get(globalText.x_auth_resu)
  var auth = {}
  if (ses) {
    auth = JSON.parse(ses)
    rout = auth.role == 'Dosen' ? routes : routes_admin
  }

  const [collapsed, setcollapsed] = useState(false)

  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };

  const { SubMenu, Item } = Menu;

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultOpenKeys={['sub2', 'sub3']}
        mode="inline"
        theme="dark"
        style={{ background: "#4b545c", color: "white", fontWeight: "bold", fontFamily: "arial" }}
        inlineCollapsed={MenuUnfoldOutlined}
      >
        <Item key="1" icon={<BarChartOutlined />}>
          <Link to="home" > Dashboard </Link>
        </Item>
       
        <Item key="672" icon={<LogoutOutlined />}>
          <Link to="login" > Logout </Link>
        </Item>

      </Menu>
    </div>
  );
}

export default MenuPetugasPasar;

// import "../assets/css/app.css";
// import { useEffect } from "react";
import _Nav from "../layouts/_Nav";
// import _Footer from "./_Footer";
// import { _Col, _Row } from "../services/Forms/LayoutBootstrap";

import { Layout, Menu, Breadcrumb, Button } from 'antd';
import MenuUtama from "./Menu/MenuUtama";
import { globalText, _Role } from "../services/Text/GlobalText";
import { Cache } from "../services/Cache";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { _Button } from "../services/Forms/Forms";
import MenuAdmin from "./Menu/MenuAdmin";


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


var ses = Cache.get(globalText.x_auth_resu)
var us = {}
if (ses) {
  us = JSON.parse(ses)
}


function _MainLayouts({ children }) {
  const [show, setshow] = useState(false)

  const setDisplay = () => {
    setshow(!show)
  }

  return (
    <Layout style={{ overflowX: "hidden" }} >
      <_Nav />
      <Layout style={{background: "#4b545c"}}>
        <Sider width={256} style={{ height: "100vh", overflow: "auto", background: "#4b545c", overflowX: "hidden" }}
          className={show ? "navbarS" : "navbarM"}>
          <MenuAdmin />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <MenuUnfoldOutlined className="buttonNav"
            onClick={setDisplay}
            style={{ width: "70px", marginLeft: "-20px", padding: "10px", fontSize: "18px", backgroundColor: "transparent" }} />
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>RSUD</Breadcrumb.Item>
            <Breadcrumb.Item>Simrs</Breadcrumb.Item>
            <Breadcrumb.Item>Simpel</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              // padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>

  );
}

export default _MainLayouts;

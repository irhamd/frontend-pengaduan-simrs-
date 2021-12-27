// import "../assets/css/app.css";
// import { useEffect } from "react";
import _Nav from "../layouts/_Nav";
// import _Footer from "./_Footer";
// import { _Col, _Row } from "../services/Forms/LayoutBootstrap";

import { Layout, Menu, Breadcrumb } from 'antd';
import MenuUtama from "./Menu/MenuUtama";
 


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

 

function _MainLayouts({ children }) {

  return (
    <Layout>
      <_Nav />
      <Layout style={{ background: "#4b545c" }}>
        <Sider width={256} style={{ height: "100vh", overflow: "auto", background: "#4b545c", overflowX: "hidden" }}>
          <MenuUtama /> 
          {/* {
            us.role == _Role.superadmin ?
              <MenuPetugasPasar />
          } */}


        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Rsudkota</Breadcrumb.Item>
            <Breadcrumb.Item>Simrs</Breadcrumb.Item>
            <Breadcrumb.Item>Pengaduan</Breadcrumb.Item>
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

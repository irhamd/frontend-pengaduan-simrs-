import React from "react";
import {
  Table,
  Radio,
  Divider,
  Input,
  Button,
  Form,
  Avatar,
  Drawer,
  Space,
  DatePicker,
  Spin,
  Popconfirm,
  Tooltip,
  Badge,
  Tag,
  Progress,
  Image,
  Rate,
  Checkbox,
} from "antd";
import moment from "moment";
import {
  AppstoreAddOutlined,
  BranchesOutlined,
  SyncOutlined,
  DownloadOutlined,
  DeploymentUnitOutlined,
  UserOutlined,
  AntDesignOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { fitrah } from "../services/Text/GlobalText";
import {
  _Date,
  _row,
  _Input,
  _Button,
  _Select,
  _Checkbox,
  _Switch,
} from "../services/Forms/Forms";
import { _Row } from "../services/Forms/LayoutBootstrap";
import _MainLayouts from "../layouts/_MainLayouts";

function Forms() {
  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {index + 1} </>,
    },
    {
      title: "Tanggal Registrasi",
      render: (_, rc) => (
        <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}</div>
      ),
      // fixed: 'left',
      width: 150,
    },
    {
      title: "Status Antrian",
      width: 150,
      render: (row) => (
        <>
          <Tag
            icon={<SyncOutlined spin />}
            color="error"
            style={{
              fontSize: "13px",
              paddingBottom: "3px",
              width: "100%",
              textAlign: "center",
            }}
          >
            Menunggu
          </Tag>
        </>
      ),
    },

    {
      title: "No. Registrasi",
      width: 150,
      dataIndex: "noregistrasi",
      sorter: (a, b) => a.noregistrasi.length - b.noregistrasi.length,
    },
    {
      title: "Instalasi",
      width: 200,
      render: (row) => (
        <>
          <Tag
            color="blue"
            style={{
              fontSize: "13px",
              paddingBottom: "3px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {row.instalasi}
          </Tag>
        </>
      ),
    },
    {
      width: 150,
      title: "Inputan",
      render: (_, rc) => (
        <div style={{ textAlign: "center" }}>
          <Avatar.Group>
            <Avatar style={{ backgroundColor: "#156dbf" }}>T</Avatar>
            <Avatar>D</Avatar>
            <Avatar>R</Avatar>
          </Avatar.Group>
          {/* <Progress percent={100} steps={3} /> */}
        </div>
      ),
    },
    {
      title: "No. RM",
      width: 130,
      dataIndex: "nocm",
      sorter: (a, b) => a.nocm.length - b.nocm.length,
    },
    {
      title: "Umur",
      width: 100,
      render: (_, rc) => <div> {fitrah.getUmur(rc.tgllahir)} </div>,
    },

    {
      width: 50,
      title: "JK",
      dataIndex: "jeniskelamin",
      sorter: (a, b) => a.jeniskelamin - b.jeniskelamin,
    },
    // {
    //     title: 'Penjamin',
    //     dataIndex: 'penjamin',
    // },

    {
      width: 150,
      title: "Penjamin",
      render: (_, rc) => (
        <div>
          <Tag color={"orange"}>{rc.penjamin}</Tag>
        </div>
      ),
    },

    {
      width: 150,
      title: "Asal Rujukan",
      dataIndex: "asalrujukan",
    },
    {
      width: 70,
      title: "Lunas",
      render: (_, rc) => (
        <div>
          <Rate disabled value={0} count={1} />
        </div>
      ),
    },
  ];

  const opp = [
    {
      val: 1,
      caption: "Satu",
    },
    {
      val: 2,
      caption: "Dua",
    },
    {
      val: 3,
      caption: "Tega",
    },
  ];

  const data = [
    {
      id: 1,
      asalrujukan: "Satu",
      jeniskelamin: "Satu",
    },
  ];

  return (
    <_MainLayouts>
      <div className="container-fluid p-0">
        <div className="mb-3">
          <h1 className="h3 d-inline align-middle">Forms</h1>
          <a
            className="badge bg-dark text-white ms-2"
            href="upgrade-to-pro.html"
          >
            Contohhh Aja
          </a>
        </div>
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Disabled</h5>
              </div>
              <div className="card-body">
                <p>
                  {" "}
                  <a href="https://ant.design/components/form/">
                    {" "}
                    antd component
                  </a>{" "}
                </p>
                <Form layout={"vertical"} onFinish={(e) => console.log(e)}>
                  <_Row>
                    <_Date sm={2} name="tglAwal" showTime label="Tanggal" />
                    <_Date sm={2} name="tglAkhir" label=" " />
                    <_Select
                      sm={2}
                      label="Ruangan"
                      option={opp}
                      val="val"
                      name="select"
                      caption="caption"
                    />
                    {/* <_Input required sm={1} label="No. RM" name="nocm" /> */}
                    <_Input sm={2} label="Nama Pasien" name="namapasien" />
                    {/* <_Input sm={2} label="No. Registrasi" name="noregistrasi" /> */}
                    <_Checkbox sm={1} name="checkbeek">
                      Checkbox
                    </_Checkbox>
                    <_Switch label="CSwitccc" sm={1} name="switt">
                      Checkbox
                    </_Switch>
                    <_Button
                      sm={1}
                      icon={<DownloadOutlined />}
                      block
                      primary
                      submit
                      style={{ marginTop: "29px" }}
                      title="Refresh"
                    />
                  </_Row>
                </Form>

                <Table
                  // rowSelection={{
                  //     type: "radio",
                  //     ...rowSelection,
                  // }}
                  // rowClassName={(record, index) => record == selected && 'bg-orange'}
                  pagination={{ position: ["bottomCenter"], pageSize: 5 }}
                  columns={columns}
                  // loading={loading}
                  // scroll={{ x: 800, y: 400 }}
                  dataSource={data}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (rc) => {
                        console.log("click row", record);
                        // setdetailpasien(acakText(aa))
                      }, // click row
                      onDoubleClick: (event) => {
                        console.log("double click", record);
                      }, // double click row
                    };
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </_MainLayouts>
  );
}

export default Forms;

import React, { useEffect, useState } from "react";
import _MainLayouts from "../../layouts/_MainLayouts";
import {
  _Button,
  _Checkbox,
  _Date,
  _Input,
  _Label,
  _Select,
  _Switch,
  _TitleBar,
} from "../../services/Forms/Forms";
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
import { fitrah } from "../../services/Text/GlobalText";
import { _Col, _Row } from "../../services/Forms/LayoutBootstrap";
import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import InputDosen from "./InputDosen";
import _Api from "../../services/Api/_Api";
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";

function DataDosen() {

  const [input, setinput] = useState(false)
  const [dataDos, setdataDos] = useState([])
  const [selected, setselected] = useState("")
  const [loadingDel, setloadingDel] = useState(false)
  const [intialData, setintialData] = useState(null)

  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {index + 1} </>,
    },
    {
      title: "Nama Dosen",
      width: 400,
      sorter: (a, b) => a.user.first_name.length - b.user.first_name.length,
      render: (_, rc) => (
        // <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}</div>
        <div> {rc.user.first_name}</div>
      )
      // fixed: 'left',
      //   width: 150,
    },
    {
 
      title: "No. HP",
      width: 150,
      dataIndex: "no_telp",
      sorter: (a, b) => a.no_telp.length - b.no_telp.length,
    },
    {
      title: "Email",
      width: 250,
      sorter: (a, b) => a.user.email.length - b.user.email.length,
      render: (_, rc) => (
        <div> {rc.user.email}</div>
      ),

    },
    
    {
      width: 250,
      title: "Username",
      width: 150,
      sorter: (a, b) => a.user.username.length - b.user.username.length,
      render: (_, rc) => (
        <div> {rc.user.username}</div>
      ),

    },
    {
      width: 150,
      title: "Hapus / Update",
      render: (_, rc) => (
        <div style={{ display: "flex" }}>
          <Popconfirm
            title="Hapus data dosen ?"
            onConfirm={() => hapusDosen(rc.kode)}
            // onCancel={cancel}
            okText="Hapus"
            cancelText="Batal"
          >
            <_Button icon={<DeleteOutlined />} sm={3} loading={loadingDel} block color="red" />
          </Popconfirm>

          <_Button icon={<EditOutlined />} sm={2} color="orange" onClick={() => editData(rc)} />
        </div>
      ),
    },



  ];

  const hapusDosen = async (id) => {
    setloadingDel(true)
    await _Api.delete(`dosen/${id}`).then(res => {
      loadData()
      setloadingDel(true)
    }).catch(err => {
      _Toastr.error(err.response.data)
    })
    setloadingDel(false)

  }
  const tambahDosen = () => {
    setintialData(null)

    setinput(true)
  }

  const tutup = () => {
    setinput(false)
  }

  const editData = (rc) => {
    setintialData(rc)
    setinput(true)
  }

  const loadData = () => {
    setloadingDel(true)
    _Api.get("dosen").then(res => {
      // console.log(res.data);
      setloadingDel(false)
      setdataDos(res.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <_MainLayouts>
      <div
        className="site-drawer-render-in-current-wrapper"
        style={{ height: "80vh" }}
      >
        <_TitleBar label="Data Dosen" />
        <p style={{ marginBlock: "10px" }}></p>
        <Form layout={"vertical"} onFinish={(e) => console.log(e)}>
          <_Row style={{ marginBottom: "400px" }}>
            <_Button
              sm={3}
              icon={<DownloadOutlined />}
              block
              primary
              submit
              style={{ marginTop: "24px" }}
              label="Tambah Dosen" onClick={tambahDosen}
            />
            <_Col sm={5} />
            
            <_Input sm={3} label="Nama Dosen" name="namapasien" />
            <_Button
              sm={1}
              icon={<DownloadOutlined />}
              block
              primary
              submit
              style={{ marginTop: "24px" }}
              title="Load"
              onCLick={loadData}
            />
          </_Row>
        </Form>
        <Table
          rowKey="kode"
          pagination={{ position: ["bottomCenter"], pageSize: 10 }} loading={loadingDel}
          columns={columns} dataSource={dataDos}
          rowClassName={(record, index) => record == selected && 'bg-selected'}
          scroll={{ x: 'calc(700px + 50%)', y: 240 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setselected(record)
              },
            };
          }}

        />
        {input &&  <InputDosen data={intialData} loadData={loadData} input={input} tutup={tutup} /> }
        <br />

      </div>
    </_MainLayouts>
  );
}

export default DataDosen;

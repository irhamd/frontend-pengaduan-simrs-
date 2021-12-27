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
  Modal,
} from "antd";
import moment from "moment";
import { fitrah } from "../../services/Text/GlobalText";
import { _Col, _Row } from "../../services/Forms/LayoutBootstrap";
import { ClusterOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, FileDoneOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import _Api from "../../services/Api/_Api";
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";
import ExpandTopic from "./ExpandTopic";
import Topic from "./Topic/Topic";
import InputMatakuliah from "./InputMatakuliah";

function DataMatakuliah() {

  const [input, setinput] = useState(false)
  const [MataKuliah, setMataKuliah] = useState([])
  const [selected, setselected] = useState("")
  const [buatTopik, setbuatTopik] = useState(false)
  const [loadingDel, setloadingDel] = useState(false)
  const [intialData, setintialData] = useState(null)
  const [tambahmatakul, settambahmatakul] = useState(false)
  const [datamatkul, setdatamatkul] = useState([])
  const [dataeditmatkul, setdataeditmatkul] = useState(null)


  const [formMatakuliah] = Form.useForm()

  const simpanMatkul = (e) => {
    let axio = dataeditmatkul
      ? _Api.put(`subject-detail/${dataeditmatkul.id_mk}`, e)
      : _Api.post("subject", e)

    axio.then(respond => {
      _Toastr.success("Suksess ...!")
      loadData()
      formMatakuliah.resetFields()
      settambahmatakul(false)
    }).catch(err => _Toastr.error('Gagal simpan matakuliah .'))
  }

  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {index + 1} </>,
    },
    {
      title: "Matakuliah",
      width: 500,
      sorter: (a, b) => a.nama_mk.length - b.nama_mk.length,
      render: (_, rc) => (
        // <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}</div>
        <div> {rc.nama_mk}</div>
      ),
      // fixed: 'left',
      //   width: 150,
    },
    {
      title: "SKS",
      width: 100,
      dataIndex: "sks",
      sorter: (a, b) => a.sks.length - b.sks.length,
      render: (_, rc) => (
        <Tag color={"orange"}>{rc.sks} SKS</Tag>
      ),

    },
    {
      title: "Deskripsi",
      width: 500,
      dataIndex: "deskripsi",
      sorter: (a, b) => a.deskripsi.length - b.deskripsi.length,
    },
    {
      title: "Token",
      width: 200,

      dataIndex: "token",
      sorter: (a, b) => a.token.length - b.token.length,
    },
    {
      width: 250,
      title: "Hapus / Update",
      render: (_, rc) => (
        <div style={{ display: "flex" }}>
          <Popconfirm
            title="Hapus Matakuliah ?"
            onConfirm={() => hapusMatakuliah(rc.id_mk)}
            // onCancel={cancel}
            okText="Hapus"
            cancelText="Batal"
          >
            <_Button icon={<DeleteOutlined />} sm={3} loading={loadingDel} block color="red" />
          </Popconfirm>

          <_Button icon={<EditOutlined />} sm={3} color="orange" onClick={() => tambahMatakuliah(rc)} />
          <_Button icon={<FileDoneOutlined />} sm={2} color="coral" onClick={() => topicBaru(rc)} />
        </div>
      ),
    },



  ];

  const topicBaru = (data) => {
    setdatamatkul(data)
    setbuatTopik(true)
  }
  const hapusMatakuliah = async (id) => {


    setloadingDel(true)
    await _Api.delete(`subject-detail/${id}`).then(res => {
      loadData()
    }).catch(err => {
      _Toastr.error(err.response.data)
    })

  }
  // const tambahMatkul = () => {
  //   setbuatTopik(true)
  //   // setinput(true) buakn yg
  // }

  const tambahMatakuliah = (e) => {
    settambahmatakul(true)
    setdataeditmatkul(e)
    let obj = { ...e, sks: e.sks.toString() }
    formMatakuliah.resetFields()
    formMatakuliah.setFieldsValue(obj)

  }



  const loadData = () => {
    setMataKuliah([])
    setloadingDel(true)
    _Api.get("subject").then(res => {
      setloadingDel(false)
      setMataKuliah(res.data)
    })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <_MainLayouts>
      <div
        className="site-drawer-render-in-current-wrapper"
        style={{ height: "80vh", overflow: "auto" }}
      >
        <_TitleBar label="MATAKULIAH" />
        <p style={{ marginBlock: "10px" }}></p>
        <Form layout={"vertical"} onFinish={loadData}>
          <_Row style={{ marginBottom: "400px" }}>
            <_Button
              sm={3}
              icon={<DownloadOutlined />}
              block
              primary
              submit
              style={{ marginTop: "24px" }}
              label="Tambah Matakuliah" onClick={() => tambahMatakuliah(null)}
            />
            <_Col sm={5} />

            <_Input sm={3} label="Matakuliah" name="matakuliah" />
            <_Button
              sm={1}
              icon={<DownloadOutlined />}
              primary
              submit
              style={{ marginTop: "24px" }}
              title=""

            />
          </_Row>
        </Form>
        <Table
          rowKey="id_mk"
          pagination={{ position: ["bottomCenter"], pageSize: 10 }} loading={loadingDel}
          columns={columns} dataSource={MataKuliah}
          scroll={{ x: 1, y: 1000 }}
          rowClassName={(record, index) => record == selected && 'bg-selected'}
          expandable={{
            expandedRowRender: record =>
              <div>
                <ExpandTopic clear={() => setMataKuliah([])} data={record} />
              </div>,
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
              ) : (
                <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
              )

            // rowExpandable: record => record.name !== 'Not Expandable',
          }}

          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setselected(record)
              },
            };
          }}

        />
        {/* <InputMatakuliah data={intialData} loadData={loadData} input={input} tutup={tutup} /> */}
        <br />

      </div>

      <Modal footer={[]} title="Tambah MataKuliah" visible={tambahmatakul}
        width={1000}
        // onOk={handleOk}
        onCancel={() => settambahmatakul(false)}
      >
        <InputMatakuliah
          simpanMatkul={simpanMatkul}
          formMatakuliah={formMatakuliah}
          close={() => settambahmatakul(false)}
          edit={dataeditmatkul}
        />

      </Modal>

      <Modal footer={[]} title="Tambah Topic" visible={buatTopik}
        width={1500}
        // onOk={handleOk}
        onCancel={() => setbuatTopik(false)}
      >
        <Topic loadData={loadData} clear={() => setMataKuliah([])} close={() => setbuatTopik(false)} datamatkul={datamatkul} />

      </Modal>

    </_MainLayouts>
  );
}

export default DataMatakuliah;

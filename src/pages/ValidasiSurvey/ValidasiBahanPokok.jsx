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
  Pagination,
  Select,
} from "antd";
import moment from "moment";
import { fitrah, formatNumber } from "../../services/Text/GlobalText";
import { _Col, _Row } from "../../services/Forms/LayoutBootstrap";
import { CheckOutlined, ClusterOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, FileDoneOutlined, MinusCircleTwoTone, PlusCircleTwoTone, SecurityScanOutlined, UpCircleOutlined } from "@ant-design/icons";
import _Api from "../../services/Api/_Api";
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";
import _Autocomplete from "../../services/Forms/_Autocomplete";
import _AutocompleteRev from "../../services/Forms/_AutocompleteRev";

function ValidasiBahanPokok() {

  const [input, setinput] = useState(false)
  const [paginate, setpaginate] = useState({})
  const [dataSurvey, setdataSurvey] = useState([])
  const [selected, setselected] = useState("")
  const [loadingDel, setloadingDel] = useState(false)
  const [loadingVerif, setloadingVerif] = useState(false)
  const [petugasPasar, setpetugasPasar] = useState([])
  const [currPage, setcurrPage] = useState("1")
  const [lokasiPasar, setLokasiPasar] = useState([])



  // const [formData] = Form.useForm()
  // const [formValidasi] = Form.useForm()

  const [showVerif, setshowVerif] = useState(false)
  const [dataVerif, setdataVerif] = useState({})
  const [parameter, setparameter] = useState({})


  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {index + 1} </>,
    },
    {
      title: "Petugas Pasar",
      width: 300,
      sorter: (a, b) => a.petugas_pasar.nama.length - b.petugas_pasar.nama.length,
      render: (_, rc) => (
        // <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}</div>
        <div> {rc.petugas_pasar.nama}</div>
      ),
      // fixed: 'left',
      //   width: 150,
    },
    {
      title: "Lokasi Pasar",
      width: 200,
      dataIndex: "pasar.nama_pasar",
      sorter: (a, b) => a.pasar.nama_pasar.length - b.pasar.nama_pasar.length,
      render: (_, rc) => (
        <b>{rc.pasar.nama_pasar}</b>
      ),

    },
    {
      title: "Varian",
      width: 300,
      // dataIndex: "varian.nama_varian",
      render: (_, rc) => (
        <div>{rc.varian && rc.varian.nama_varian}</div>
      ),
      // sorter: (a, b) => a.varian.nama_varian.length - b.varian.nama_varian.length,
    },
    {
      title: "Tanggal Survey",
      width: 200,
      dataIndex: "tgl_survey",
      sorter: (a, b) => a.tgl_survey.length - b.tgl_survey.length,
    },


    {
      title: "Valid",
      width: 100,
      render: (_, rc) => (
        <div style={{ textAlign: "center" }} >
          {rc.valid == "ya" ? <Tag color={"green"}> <b> {rc.valid} </b> </Tag> : <Tag color={"orange"}> {rc.valid} </Tag>}
        </div>

      )
    },
 



  ];


 
  const simpanValidasi = (val) => {

    setloadingVerif(false)
    _Api.post(`survey/validasi`, { ...val, tanggal: moment(val.tanggal).format('DD/MM/YYYY') }).then(res => {

      console.log('res.data :>> ', res.data);
      if (res.data.message.sts == "1") {
        loadData()
        _Toastr.success(res.data.message.msg)
      } else {
        _Toastr.error(res.data.message.msg)
        loadingVerif(false)
      }
      // setshowVerif(false)
      // setloadingVerif(false)

      // setdataVerif(null)
    }).catch(err => {
      // console.log('err :>> ', err);
      _Toastr.error(err.response.data.message.msg)

    })
  }


  const loadData = (val, pg) => {
    if (val) {

      var obj = {
        ...val,
        "tglawal": moment(val && val.tglawal).format('YYYY-MM-DD'),
        "tglakhir": moment(val && val.tglakhir).format('YYYY-MM-DD'),
      }
      setparameter(obj)
    } else {
      var obj = parameter
    }

    setloadingDel(true)
    _Api.get(`survey/show-by-varian-bahan-pokok?with[]=pasar&with[]=varian.komoditi&with[]=petugas_pasar&paginate=true&page=${pg}`, { params: obj }).then(res => {
      setloadingDel(false)
      setpaginate(res.data.meta)
      setdataSurvey(res.data.data)
    })
  }

  const loadCombo = () => {
    // _Api.get("manajemen-pengguna").then(res => {
    //   setpetugasPasar(res.data.data)
    //   setloadingDel(false)
    // })
    // _Api.get("pasar").then(res => {
    //   setLokasiPasar(res.data.data)
    //   setloadingDel(false)
    // })

  }


  useEffect(() => {
 
    // loadData()
    loadCombo()
  }, [])

  return (
    <_MainLayouts>

      {
        dataVerif &&
        <Modal title="Validasi Survey" style={{ background: "green" }} footer={[]} visible={showVerif} onCancel={() => setshowVerif(false)} >
          <Spin 
          spinning={false}
          >
            <_Row>
              <Form layout="vertical"  onFinish={simpanValidasi} >

                {/* <_Input label="Petugas Pasar" disabled name="" /> */}
                {/* <_Input label="Varian" disabled name="nama_varian" defaultValue={dataVerif && dataVerif.varian.nama_varian} /> */}
                <_Select label="Lokasi Pasar" name="pasar_id" required option={lokasiPasar} val="id" caption="nama_pasar" />
                <_Date label="Tanggal Survey" format ={"DD/MM/YYYY"} name="tanggal" required />

                <_Button label="Verif" icon={<CheckOutlined />} submit sm={4} block />
              </Form>
            </_Row>
          </Spin>
        </Modal>
      }

      <_TitleBar label=" DATA HASIL SURVEY BAHAN POKOK" />
      <p style={{ marginBlock: "10px" }}></p>
      <Form layout={"vertical"} onFinish={(e) => loadData(e, "1")}>
        <_Row style={{ marginBottom: "400px" }}>
          <_Date sm={2} label="Tanggal Survey" format={"DD-MM-YYYY"} name="tglawal" />
          <_Date sm={2} label=" " format={"DD-MM-YYYY"} name="tglakhir" option={petugasPasar} />
          <_Select label="Nama petugas pasar" name="petugas_pasar_id" option={petugasPasar} sm={3} val="id" caption="nama" />
          <_Select label="Lokasi Pasar" name="lokasi_pasar" option={lokasiPasar} sm={3} val="id" caption="nama_pasar" />
          <_Switch label="Belum Verif" name="veri" sm={1} />

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
        rowKey="id"
        pagination={{ position: [], pageSize: 10 }}

        // loading={loadingDel}
        columns={columns} dataSource={dataSurvey}
        scroll={{ x: 1, y: 1000 }}
        rowClassName={(record, index) => record == selected && 'bg-selected'}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setselected(record)
            },
          };
        }}

      />
      <br />
      <Pagination style={{ width: "100%", textAlign: "center" }} showQuickJumper defaultCurrent={currPage} total={paginate.total}
        onChange={(e) => {
          loadData(null, e)
        }} />





    </_MainLayouts>
  );
}

export default ValidasiBahanPokok;

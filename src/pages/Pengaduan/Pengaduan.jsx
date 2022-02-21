import React, { useEffect, useState } from "react";
import _MainLayouts from "../../layouts/_MainLayouts";
import {
  _Button, _Checkbox, _Date, _Input, _Label, _Select, _Switch, _TitleBar,
} from "../../services/Forms/Forms";
import {
  Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate, Checkbox, Modal, Pagination, Select,
} from "antd";
import moment from "moment";
import { fitrah, formatNumber, getBetweenDate } from "../../services/Text/GlobalText";
import { _Col, _Row } from "../../services/Forms/LayoutBootstrap";
import { CheckOutlined, ClusterOutlined, DeleteColumnOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, FileDoneOutlined, FundViewOutlined, MinusCircleTwoTone, PlusCircleTwoTone, SecurityScanOutlined, SyncOutlined, UpCircleOutlined, UserSwitchOutlined } from "@ant-design/icons";
import _Api, { baseRoute, baseURL } from "../../services/Api/_Api";
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";
import _Autocomplete from "../../services/Forms/_Autocomplete";
import _AutocompleteRev from "../../services/Forms/_AutocompleteRev";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../../services/firebase/firebase";
import InputPengaduan from "./InputPengaduan";
import EditPengaduan from "./EditPengaduan";



function Pengaduan() {

  // const date1 = new Date('7/13/2010');
  // const date2 = new Date('12/15/2010');

  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {index + 1} </>,
    },
    {
      title: "Nomor Pengaduan",
      width: 130,
      // sorter: (a, b) => a.petugas_pasar.nama.length - b.petugas_pasar.nama.length,
      render: (_, rc) => (
        <div> <b> {rc.nomorpengaduan} </b></div>
      ),
    },
    {
      title: "Ruangan",
      width: 200,
      dataIndex: "unitkerja",
    },
    {
      title: "Tanggal Pengaduan",
      width: 150,
      sorter: (a, b) => a.tgl_survey.length - b.tgl_survey.length,
      render: (_, rc) => (
        <div> {moment(rc.created_at).format("DD/MM/YYYY HH:mm")}</div>
      ),
    },

    {
      title: "No. HP Pengadu",
      width: 130,
      dataIndex: "nohp",
    },

    {
      title: "Isi Pengaduan",
      width: 300,
      sorter: (a, b) => a.harga - b.harga,
      render: (_, rc) => (
        <div > {rc.isipengaduan} </div>
      ),
    },
    {
      title: "Nama Penanggung Jawab",
      width: 300,
      sorter: (a, b) => a.nama - b.nama,
      render: (_, rc) => (
        <div > {rc.nama} </div>
      ),
    },
    {
      title: "Progres",
      width: 100,
      render: (_, rc) => (
        <Tag color={rc.progres == "rq" ? "red" : rc.progres == "pr" ? "orange" : rc.progres == "dn" ? "green" : ""} style={{ fontSize: "13px" }}>
          <SyncOutlined spin={rc.progres != "dn"} />
          <b> &nbsp; {rc.progres && rc.progres.toUpperCase()} </b>
        </Tag>
      ),
    },

    {
      title: "",
      width: 250,
      render: (_, rc) => (
        <div style={{ padding: "10px", textAlign: "right", fontWeight: "" }}>
          {!rc.waktu_selesai && getBetweenDate(rc.created_at, "")} yang lalu
        </div>
      ),
    },

    // {
    //   title: "Progres",
    //   width: 100,
    //   render: (_, rc) => (
    //     <Tag color={"red"} style={{ fontSize: "13px" }}>  <SyncOutlined spin /> {rc.progres} </Tag>
    //   ),
    // },

    {
      title: "Di tangani oleh",
      width: 250,
      render: (_, rc) => (
        <div style={{ display: "flex", padding: "5px" }}>
          {rc.assignto ?
            <>
              <Image width={50} style={{ borderRadius: "50%" }} src={baseRoute + "Users/" + rc.foto} />
              <p style={{ marginTop: "20px", marginLeft: "10px" }}> {rc.namapegawai} </p>
            </> :
            <b> <p style={{ marginTop: "20px", marginLeft: "10px" }}> {rc.namapegawai} </p> </b>
          }
        </div>
      ),
    },
    {
      title: "Assign To",
      width: 100,
      render: (_, rc) => (
        <div style={{ textAlign: "center" }}>
          <Button type="primary" icon={<UserSwitchOutlined />} onClick={() => pilihPegawai(rc)} /> &nbsp;
        </div>
      ),
    },
    {
      title: "Action",
      width: 100,
      render: (_, rc) => (
        <div>
          <Button type="primary" icon={<EditOutlined />} style={{ background: "orange", borderColor: "orange" }}
            onClick={() => editPengaduan(rc)} /> &nbsp;
          <Popconfirm
            title="Hapus tugas ???"
            onConfirm={() => hapusTugas(rc.id)}
            // onCancel={cancel}
            okText="Ya"
            cancelText="Batal"
          >
            <Button danger type="primary" icon={<DeleteColumnOutlined />} />
          </Popconfirm>

        </div>
      ),
    },
    {
      title: "Tanggal Penyelesaian",
      width: 150,
      sorter: (a, b) => a.tgl_survey.length - b.tgl_survey.length,
      render: (_, rc) => (
        <div>  {rc.waktu_selesai && moment(rc.waktu_selesai).format("DD/MM/YYYY HH:mm")}</div>
      ),
    },
    {
      title: "Solusi",
      width: 200,
      render: (_, rc) => (
        <div>
          {rc.solusi}
        </div>
      ),
    },
    {
      title: "Penyebab",
      width: 200,
      render: (_, rc) => (
        <div>
          {rc.penyebab}
        </div>
      ),
    },
    {
      title: "Foto Sebelum",
      width: 200,
      render: (_, rc) => (
        <div>
          {rc.foto_sebelum &&
            <Image height={100} src={baseRoute + "Pengaduan/" + rc.foto_sebelum} />
          }
        </div>
      ),
    },
    {
      title: "Foto Sesudah",
      width: 200,
      render: (_, rc) => (
        <div>
          {rc.foto_sesudah &&
            <Image height={100} src={baseRoute + "Pengaduan/" + rc.foto_sesudah} />
          }
        </div>
      ),
    },
    {
      title: "Respond Time",
      width: 200,
      render: (_, rc) => (
        <div style={{ background: rc.waktu_selesai && "orange", padding: "10px", textAlign: "right", fontWeight: "bold" }}>
          {getBetweenDate(rc.created_at, rc.waktu_selesai)}
        </div>
      ),
    },
    // {
    //   width: 250,
    //   title: "Hapus / Update",
    //   render: (_, rc) => (
    //     <div style={{ display: "flex" }}>
    //       <Popconfirm
    //         title="Hapus Matakuliah ?"
    //         onConfirm={() => hapusMatakuliah(rc.id_mk)}
    //         // onCancel={cancel}
    //         okText="Hapus"
    //         cancelText="Batal"
    //       >
    //         <_Button icon={<DeleteOutlined />} sm={3} loading={loadingDel} block color="red" />
    //       </Popconfirm>

    //       <_Button icon={<EditOutlined />} sm={3} color="orange" onClick={() => tambahMatakuliah(rc)} />
    //       <_Button icon={<FileDoneOutlined />} sm={2} color="coral" onClick={() => topicBaru(rc)} />
    //     </div>
    //   ),
    // },



  ];

  const [input, setinput] = useState(false)
  const [paginate, setpaginate] = useState({})
  const [dataPengaduan, setdataPengaduan] = useState([])
  const [selected, setselected] = useState("")
  const [loadingDel, setloadingDel] = useState(false)
  const [loadingVerif, setloadingVerif] = useState(false)
  const [petugas, setpetugas] = useState([])
  const [rec, setrec] = useState(null)
  const [dataRuangan, setdataRuangan] = useState([])
  const [devisilain, setdevisilain] = useState([])
  const [showAssign, setshowAssign] = useState(false)
  const [dataPegawai, setdataPegawai] = useState([])
  const [idPegawai, setidPegawai] = useState(null)
  const [alihkanke, setalihkanke] = useState(null)
  const [itemData, setitemData] = useState([])
  const [showEdit, setshowEdit] = useState(true)
  const [alihkan, setalihkan] = useState(false)


  const editPengaduan = (rc) => {
    console.log(rc);
    setrec(rc)
    setshowEdit(true)
  }

  const [FormData] = Form.useForm()
  const loadData = (val) => {
    var filt = {
      ...val,
      tglawal: moment(val.tglawal).format('YYYY-MM-DD 00:00'),
      tglakhir: moment(val.tglakhir).format('YYYY-MM-DD 23:59'),
    }
    _Api.get("pengaduan-getKeluhanPasien", { params: filt }).then(res => {
      setdataPengaduan(res.data)
    })

  }

  const pilihPegawai = (item) => {
    setshowAssign(true)
    setitemData(item)
    setidPegawai( null )
    setalihkanke( null )
    setalihkan( false )

  }


  const loadCombo = () => {
    setloadingDel(true)
    _Api.post("getMasterData", { "masterData": "pegawai_m" }).then(res => {
      setdataPegawai(res.data)
      setloadingDel(false)
    })
    _Api.post("getMasterData", { "masterData": "m_ruangan" }).then(res => {
      setdataRuangan(res.data)
      setloadingDel(false)
    })

    _Api.post("getMasterData", { "masterData": "unitkerja_m" }).then(res => {
      setdevisilain(res.data)
      setloadingDel(false)
    })

  }

  const hapusTugas = (id) => {
    setloadingDel(true)
    _Api.delete("pengaduan-hapusTugas?id=" + id).then(res => {
      FormData.submit()
      setloadingDel(false)
    })
  }

  const setAssignTo = () => {
    setloadingDel(true)
    var obj = alihkan ?  setidPegawai(null) :  setalihkan(null) 

    _Api.post("pengaduan-assignTo",  { "assignto": idPegawai,"alihkanke": alihkanke , "id": itemData.id }).then(res => {
      // setdataPegawai(res.data)
      // loadData()
      FormData.submit()
      setshowAssign(false)
      setloadingDel(false)
    })
  }



  useEffect(() => {
    FormData.setFieldsValue({
      tglawal: moment(),
      tglakhir: moment(),
    })


    onSnapshot(
      collection(db, "service"),
      (snapshot) => {
        FormData.submit()
      })


    FormData.submit()

    loadCombo()

    // FormData.setFieldsValue({
    //   tglawal: moment().format('YYYY-MM-DD 00:00:00'),
    //   tglakhir: moment().format('YYYY-MM-DD 23:59:49'),
    // })

  }, [showEdit])

  return (
    <div>
      <_MainLayouts>

        <Modal title="Siapa Yang Diperintahkan ?" visible={showAssign}
          onOk={setAssignTo}
          onCancel={() => setshowAssign(false)}>
          <Form layout="vertical">
            <_Select label="Nama Petugas"
              value = {idPegawai}
              onSelect={(e) => setidPegawai(e)}
              option={dataPegawai}  val="id" caption="namapegawai" />

            <_Switch label="Alihkan" name="veri" sm={2} defaultChecked={ alihkan }  onChange={ e=>setalihkan(e) } />
            { alihkan &&  
            <_Select label="Devisi Lain"
              value = {alihkanke}
              onSelect={(e) => setalihkanke(e)}
              option={devisilain}  val="id" caption="unitkerja" />
            }


          </Form>

        </Modal>


        <_TitleBar label=" DATA PENGADUAN SIMRS RSUD KOTA MATARAM" />
        <p style={{ marginBlock: "10px" }}></p>
        <Form layout={"vertical"} form={FormData} onFinish={(e) => loadData(e)}>
          <_Row style={{ marginBottom: "400px" }}>
            <_Date sm={2} label="Tanggal Pengaduan" showTime format={"DD-MM-YYYY  HH:mm"} name="tglawal" />
            <_Date sm={2} label=" " format={"DD-MM-YYYY HH:mm"} showTime name="tglakhir" option={petugas} />
            <_Select label="Nama Petugas" name="id_pegawai" option={dataPegawai} sm={3} val="id" caption="namapegawai" />
            <_Select label="Ruangan" name="ruangan" option={ dataRuangan } sm={3} val="ruangan" caption="ruangan" />
            <_Switch label="Close" name="veri" sm={1} />

            <_Button sm={1} icon={<DownloadOutlined />} primary submit style={{ marginTop: "24px", marginBottom: "5px" }} title="" />
          </_Row>
        </Form>
        <Table
          rowKey="id"
          loading={loadingDel}
          pagination={{ pageSize: 7 }}
          columns={columns} dataSource={dataPengaduan}
          scroll={{ y: 1400 }}
          rowClassName={(record, index) => record.close == "1" && 'bg-selected'}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setselected(record)
              },
            };
          }}

        />
        <br />

        {rec && <Modal title="Edit Pengaduan" visible={showEdit} width={1000} footer={[]}
          onCancel={() => { setshowEdit(false); setrec(null) }}>
          <EditPengaduan rec={rec} tutup={()=>setshowEdit(false)} />
        </Modal>
        }


      </_MainLayouts>
    </div>
  )
}

export default Pengaduan

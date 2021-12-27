import React, { useEffect, useState } from "react";
import _MainLayouts from "../../layouts/_MainLayouts";
import { _Button, _Checkbox, _Date, _Input, _Label, _Mentions, _Number, _RadioGroup, _Select, _Switch, _TitleBar, } from "../../services/Forms/Forms";
import { Table, Radio, Divider, Input, Button, Form, Avatar, Drawer, Space, DatePicker, Spin, Popconfirm, Tooltip, Badge, Tag, Progress, Image, Rate, Checkbox, Modal, Pagination, Select, Mentions, } from "antd";
import moment from "moment";
import { fitrah, formatNumber, globalText, _Role } from "../../services/Text/GlobalText";
import { _Col, _Row } from "../../services/Forms/LayoutBootstrap";
import { CheckOutlined, ClusterOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, FileDoneOutlined, MinusCircleTwoTone, PlusCircleTwoTone, SecurityScanOutlined, UpCircleOutlined } from "@ant-design/icons";
import _Api from "../../services/Api/_Api";
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";
import _Autocomplete from "../../services/Forms/_Autocomplete";
import _AutocompleteRev from "../../services/Forms/_AutocompleteRev";
import { Cache } from "../../services/Cache";
import { withRouter } from "react-router-dom";
import { updateFirebase } from "../../services/firebase/UFirebase";

function InputPengaduan(pr) {


  const [loadingDel, setloadingDel] = useState(false)
  const [petugasPasar, setpetugasPasar] = useState([])
  const [dataPegawai, setdataPegawai] = useState([])
  const [dataRuangan, setdataRuangan] = useState([])
  const [ruangan, setruangan] = useState("")



  const [formData] = Form.useForm()


  var ses = Cache.get(globalText.x_auth_resu)
  var us = {}
  if (ses) { us = JSON.parse(ses) }



  const simpanPengaduan = (val) => {
    setloadingDel(true)
    _Api.post(`pengaduan-simpanPengaduan`, val).then(res => {
      setloadingDel(false)
      if (res.data.sts == "1")
      {
        _Toastr.success("Suksess ...")
        formData.resetFields()

          var objmessage = {
            "title": val.isipengaduan.toUpperCase() ,
            "body": "Nifas",
            "token": res.data.token
          }
        _Api.post(`notif-sendNotification`, objmessage).then(res => {
        })
      } else{
        _Toastr.error("gagal simpand data ...")

      }

      // updateFirebase()
    }).catch(err => {
    })
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
  }

  useEffect(() => {

    formData.setFieldsValue({
      tgl_survey: moment()
    })
    // loadData()
    loadCombo()
  }, [])
  return (
    <_MainLayouts>


      <_TitleBar label=" TAMBAH PENGADUAN" />
      <br />
      <p style={{ marginBlock: "10px" }}></p>
      <Form layout={"vertical"} layout={"horizontal"}
        wrapperCol={{ span: 12 }} labelCol={{ span: 5 }} onFinish={simpanPengaduan} form={formData}>
        <_Row style={{ marginBottom: "400px" }}>
          <_Select label="Nama Ruangan" name="unitkerja"
            onSelect= { (e,f)=> setruangan(f.children[1])}
          option={dataRuangan} val="ruangan" caption="ruangan" required />
          {/* $save->unitkerja = $req['unitkerja'];
            $save->id_ruangan = $req['id_ruangan'];
            $save->nohp = $req['nohp'];
            $save->isipengaduan = $req['isipengaduan'];
            $save->assignto = $req['assignto'];
            $save->nomorpengaduan = $req['nomorpengaduan']; */}
          <_Input label="Nama" name="nama" required />
          <_Date label="Tanggal" format={"DD/MM/YYYY HH:mm:ss"} name="tgl_survey" required />
          <_Number label="Nomor HP" name="nohp" />
          <_Input label="Isi Pengaduan / Permintaan" multiline name="isipengaduan" required />
          {/* <_Mentions label="Isi Pengaduan / Permintaan" list={[
            { value: "Internet Mati", caption: "Internet Mati" }
          ]} /> */}
          <_Select label="Di tangani oleh" name="assignto" option={dataPegawai} val="id" caption="namapegawai" required />
          <_Input label="Keterangan" multiline name="keterangan" />
          <_Col sm={3} />
          <_Button sm={3} block icon={<DownloadOutlined />} primary label="Simpan" submit style={{ marginTop: "24px" }} title=" " loading={loadingDel} />
          <_Button sm={2} block primary label="Reset" onClick={() => formData.resetFields()} color="red" btnCancel style={{ marginTop: "24px" }} title=" " loading={loadingDel} />
        </_Row>
      </Form>
      <br />
      <br />
      <hr />




    </_MainLayouts>
  );
}

export default InputPengaduan;

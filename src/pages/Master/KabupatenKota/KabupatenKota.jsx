import React, { useEffect, useState } from "react";
import _MainLayouts from "../../../layouts/_MainLayouts";
import {
  _Button,
  _Checkbox,
  _Date,
  _Input,
  _Label,
  _Select,
  _Switch,
  _TitleBar,
} from "../../../services/Forms/Forms";
import {
  Table,
  Form,
} from "antd";
import { _Col, _Row } from "../../../services/Forms/LayoutBootstrap";
import _Api from "../../../services/Api/_Api";
import { _Toastr } from "../../../services/Toastr/Notify/_Toastr";

function KabupatenKota() {

  const [input, setinput] = useState(false)
  const [paginate, setpaginate] = useState({})
  const [dataSurvey, setdataSurvey] = useState([])
  const [selected, setselected] = useState("")
  const [loadingDel, setloadingDel] = useState(false)



  const [formMatakuliah] = Form.useForm()



  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {index + 1} </>,
    },
    {
      title: "Nama Kabupaten",
      width: 300,
      sorter: (a, b) => a.nama_kabupaten.length - b.nama_kabupaten.length,
      render: (_, rc) => (
        <div> {rc.nama_kabupaten}</div>
      ),
    },
  ];



  const loadData = () => {
    setloadingDel(true)
    _Api.get("w/kabupaten").then(res => {
      setloadingDel(false)
      console.log('res.data :>> ', res.data);
      setdataSurvey(res.data.data)
      // setpaginate(res.data.meta)
      // setMataKuliah(res.data)
    })
  }


  useEffect(() => {
    loadData()
  }, [])

  return (
    <_MainLayouts>

      <_TitleBar label=" DATA MASTER KABUPATEN KOTA" />
      <p style={{ marginBlock: "10px" }}></p>
      <Table
        rowKey="id"
        pagination={{ position: [], pageSize: 10 }} loading={loadingDel}
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

    </_MainLayouts>
  );
}

export default KabupatenKota;

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
  Pagination} from "antd";
import { _Col, _Row } from "../../../services/Forms/LayoutBootstrap";
import _Api from "../../../services/Api/_Api";
import { _Toastr } from "../../../services/Toastr/Notify/_Toastr";
import _AutocompleteRev from "../../../services/Forms/_AutocompleteRev";

function Kecamatan() {

  const [input, setinput] = useState(false)
  const [paginate, setpaginate] = useState({
      total : 10,
      from : 1
  })
  const [page, setPage] = useState({
    size : 10,
    cp : 1,
})
  const [dataSurvey, setdataSurvey] = useState([])
  const [dataKabupaten, setDataKabupaten] = useState([])
  const [selected, setselected] = useState("")
  const [loadingDel, setloadingDel] = useState(false)



  const [formData] = Form.useForm()




  const columns = [
    {
      title: "No",
      width: 100,
      align: "center",
      render: (text, row, index) => <> {paginate.from + index } </>,
    },
    {
      title: "Nama Kecamatan",
      width: 300,
      sorter: (a, b) => a.nama_kecamatan.length - b.nama_kecamatan.length,
      render: (_, rc) => (
        <div> {rc.nama_kecamatan}</div>
      ),
    },
    {
        title: "Nama Kabupaten",
        width: 300,
        sorter: (a, b) => a.kabupaten.nama_kabupaten.length - b.kabupaten.nama_kabupaten.length,
        render: (_, rc) => (
          // <div> {moment(rc.tglregistrasi).format("DD-MM-YYYY HH:mm")}</div>
          <div> {rc.kabupaten.nama_kabupaten}</div>
        ),
    },
  ];



  const loadData = (cp, size) => {
    setloadingDel(true)
    _Api.get(`w/kecamatan?with[]=kabupaten_kota&paginate=true&page=${cp}&per_page=${size}`).then(res => {
      setloadingDel(false)
      console.log('res.data :>> ', res.data);
      setdataSurvey(res.data.data)
      setpaginate(res.data.meta)
      // setMataKuliah(res.data)
    })
  }

  const onChangePageSize = (cp, size) => {
      console.log(cp,size)
      setPage({size : size, cp : cp})
      loadData(cp, size)
  }


  useEffect(() => {
    loadData(1,10)
  }, [])

  return (
    <_MainLayouts>

      <_TitleBar label=" DATA MASTER KECAMATAN" />
      <p style={{ marginBlock: "10px" }}></p>
      <Table
        rowKey="id"
        pagination={{ position: [], pageSize: page.size }} loading={loadingDel}
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
      <Pagination style={{ width: "100%", textAlign: "center" }} 
                defaultCurrent={1} 
                total={parseInt(paginate.total)} 
                onChange={(cp, size) => onChangePageSize(cp, size)} 
                />

    </_MainLayouts>
  );
}

export default Kecamatan;

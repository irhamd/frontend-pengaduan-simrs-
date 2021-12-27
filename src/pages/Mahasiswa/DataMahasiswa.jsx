import { Card, Form, Table } from "antd";
import React, { useEffect, useState } from 'react'
import _MainLayouts from '../../layouts/_MainLayouts'
import _Api from "../../services/Api/_Api";
import { _Button, _Input } from '../../services/Forms/Forms'
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";
// import {_Input} from "../../services/Forms"

function DataMahasiswa() {

    const [dataMhs, setDataMhs] = useState([])

    // var dataMhs = [];

    const columns = [
        {
            title: "Nama Mahasiswa",
            dataIndex: "nama",
            sorter: (a, b) => a.nama.length - b.nama.length,
        },
        {
            title: "NIM",
            dataIndex: "nim",
            sorter: (a, b) => a.nim.length - b.nim.length,
        },
        {
            title: "Program Studi",
            dataIndex: "prodi",
            sorter: (a, b) => a.prodi.length - b.prodi.length,
        },



    ];

    const simpanData = (ee) => {
        // console.log(ee)
        _Api.post("mahasiswa", ee).then(aa => {
            showData()
            _Toastr.success("Berhasill")
        }).catch(errror => {
            _Toastr.error("galgall ")

        })

    }

    const showData = (ee) => {
        // console.log(ee)
        _Api.get("mahasiswa").then(aa => {
            setDataMhs(aa.data)
        })

    }

    useEffect(() => {
        showData()
    }, [])

    return (
        <div>
            <_MainLayouts>
                <Card title="Data Mahasiswa">
                <Table
                    rowKey="id"
                    pagination={{ position: ["bottomCenter"], pageSize: 10 }}
                    columns={columns} dataSource={dataMhs}

                />
                </Card>
            </_MainLayouts>
        </div>
    )
}

export default DataMahasiswa

import { CloseSquareOutlined, DeleteOutlined, DeleteRowOutlined, EditOutlined, MinusCircleOutlined, MinusCircleTwoTone, PlusCircleTwoTone, UsergroupAddOutlined } from '@ant-design/icons';
import { Divider, Drawer, List, Popconfirm, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import _Api from '../../../services/Api/_Api';
import { _Button, _TitleBar } from '../../../services/Forms/Forms';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { fitrah, formatTgl } from '../../../services/Text/GlobalText';
import InputJadwal from './InputJadwal';
import PilihMahasiswa from './PilihMahasiswa';

function JadwalPembelajaran({ idtopic }) {
    const [input, setinput] = useState(false)
    const [dataJadwal, setdataJadwal] = useState([])
    const [selected, setselected] = useState("")
    const [loadingDel, setloadingDel] = useState(false)
    const [pilihMahasiswa, setpilihMahasiswa] = useState(false)
    const [intialData, setintialData] = useState(null)

    const columns = [
        {
            title: "No",
            width: 100,
            align: "center",
            render: (text, row, index) => <> {index + 1} </>,
        },
        {
            title: "Tanggal",
            width: 300,
            sorter: (a, b) => a.date.length - b.date.length,
            render: (_, rc) => (
                <div> {formatTgl(rc.date)}</div>
            ),

        },
        {
            title: "Jam",
            width: 200,
            sorter: (a, b) => a.time.length - b.time.length,
            render: (_, rc) => (
                <div> {rc.time}</div>
            ),

        },
        {
            title: "Hapus / Jadwal",
            render: (_, rc) => (
                <div style={{ display: "flex" }}>
                    <Popconfirm
                        title="Hapus jadwal ini  ?"
                        onConfirm={() => hapusJadwal(rc.id)}
                        // onCancel={cancel}
                        okText="Hapus"
                        cancelText="Batal"
                    >
                        <_Button icon={<DeleteRowOutlined />} sm={3}  color="red" />

                    </Popconfirm>
                    {/* <_Button icon={<UsergroupAddOutlined />} loading={loadingDel} label="Pilih Mahasiswa" onClick={() => setpilihMahasiswa(true)} color="orange" /> */}

                </div>
            ),
        },



    ];



    const loadData = () => {
        setloadingDel(true)
        _Api.get("topic-jadwal/" + idtopic).then(res => {
            setdataJadwal(res.data)
            setloadingDel(false)
        }).catch(err => {
            setloadingDel(false)

        })
    }

    const hapusJadwal = (id) => {
        setloadingDel(true)
        _Api.delete("topic-jadwal-detail/" + id).then(res => {
            loadData()
        }).catch(err => {
            setloadingDel(false)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>

            <_Row>
                <_Col sm={4}>
                    <InputJadwal idtopic={idtopic} loadData={loadData} />
                </_Col>
                <br />
                <_Col sm={8}>
                    <_TitleBar title="Jadwal Pembelajaran" align="center" />
                    <p style={{ marginBottom: "5px" }}></p>
                    <Table
                        rowKey="id"
                        pagination={{ position: ["bottomCenter"], pageSize: 10 }} loading={loadingDel}
                        columns={columns} dataSource={dataJadwal}
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

                </_Col>
            </_Row>
        </div>
    )
}

export default JadwalPembelajaran

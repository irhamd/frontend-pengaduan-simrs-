import { CloseSquareOutlined, DeleteOutlined, DeleteRowOutlined, DownloadOutlined, EditOutlined, MinusCircleOutlined, MinusCircleTwoTone, PlusCircleTwoTone, UploadOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Divider, Drawer, List, Popconfirm, Row, Table, Form, Upload, Button, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import _Api, { baseURLMaster } from '../../../services/Api/_Api';
import { Cache } from '../../../services/Cache';
import { _Button, _Date, _Input, _Label, _TitleBar } from '../../../services/Forms/Forms';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { fitrah, formatTgl, globalText } from '../../../services/Text/GlobalText';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';
import InputJadwal from './InputJadwal';
import PilihMahasiswa from './PilihMahasiswa';

function TugasTopic({ idtopic }) {
    const [input, setinput] = useState(false)
    const [dataTugas, setdataTugas] = useState([])
    const [selected, setselected] = useState("")
    const [loading, setloading] = useState(false)
    const [pilihMahasiswa, setpilihMahasiswa] = useState(false)
    const [intialData, setintialData] = useState(null)
    const [fileUpload, setfileUpload] = useState(null)
    const [form] = Form.useForm()

    const columns = [
        {
            title: "No",
            width: 100,
            align: "center",
            render: (text, row, index) => <> {index + 1} </>,
        },
        {
            title: "File Name",
            width: 300,
            sorter: (a, b) => a.date.length - b.date.length,
            render: (_, rc) => (
                <div> {rc.soal_pdf}</div>
            ),

        },
        {
            title: "Durasi",
            width: 200,
            sorter: (a, b) => a.durasi.length - b.durasi.length,
            render: (_, rc) => (
                <div> {rc.durasi}</div>
            ),

        },

        {
            title: "Hapus",
            width: 100,
            render: (_, rc) => (
                <div style={{ display: "flex" }}>
                    <Popconfirm
                        title="Hapus Tugas  ?"
                        onConfirm={() => hapusJadwal(rc)}
                        // onCancel={cancel}
                        okText="Hapus"
                        cancelText="Batal"
                    >
                        <_Button icon={<DeleteRowOutlined />} sm={3} loading={loading} color="red" />

                    </Popconfirm>
                    {/* <_Button icon={<UsergroupAddOutlined />} loading={loading} label="Pilih Mahasiswa" onClick={() => setpilihMahasiswa(true)} color="orange" /> */}

                </div>
            ),
        },



    ];

    const history = useHistory()


    var bod = new FormData();

    var datatopic = JSON.parse(Cache.get("prosestopic"))
    if (!datatopic) {
        history.push("DataMatakuliah")
    }


    const simpanTugas = (val) => {

       
        setloading(true)


        bod.append('topic', datatopic.id);
        bod.append('durasi', val.durasi);
        bod.append('soal_pdf', fileUpload);

        axios({
            method: "post",
            url: baseURLMaster + "topic-tugas/" + datatopic.id,
            data: bod,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + Cache.get(globalText.x_auth_access_token)
            },
        })
            .then(function (response) {
                setloading(false)
                loadData()
                _Toastr.success("Suksess ...")
            })
            .catch(function (response) {
                setloading(false)
                _Toastr.error("Gagal ...")
            });

        // _Api.post(`materi/1/${id_matakuliah}`, item).then(res => {
        //     console.log(res.data)
        // }).catch(err => {
        //     _Toastr.error("Gagal Simpan ...")
        // })
        // setloading(false)
        form.resetFields()
    }

    const changeUpload = (e) => {
        setfileUpload(e.target.files[0])

    }

    const loadData = () => {
        setloading(true)
        _Api.get("topic-tugas/" + datatopic.id).then(res => {
            setdataTugas(res.data)
            setloading(false)
        }).catch(err => {
            setloading(false)

        })
    }

    const hapusJadwal = (id) => {

        console.log(`id`, id)
        return
        setloading(true)
        _Api.delete("topic-jadwal-detail/" + id).then(res => {
            loadData()
        }).catch(err => {
            setloading(false)
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>

            <_Row>

                <br />
                <_Col sm={8}>
                    <_TitleBar title="Tugas Mahasiswa" align="center    " />
                    <p style={{ marginBottom: "5px" }}></p>
                    <Table
                        rowKey="id"
                        pagination={{ position: ["bottomCenter"], pageSize: 10 }} loading={loading}
                        columns={columns} dataSource={dataTugas}
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
                <_Col sm={4}>
                    <div style={{ marginBottom: "-10px", marginLeft: "10px" }}>
                        <Spin spinning={loading} >
                            <_Label label="Input Tugas Baru" />
                            <Form layout="vertical" form={form}
                                onFinish={simpanTugas}
                            >
                                <_Input label="Durasi" sm={5} addonAfter="Menit" name="durasi" required/>
                                <input type="file" id="filetugas" onChange={changeUpload} />
                                {/* <Upload >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>, */}
                                <br />
                                <_Row>
                                    <_Col sm={7} />
                                    <_Button sm={5} block label="Simpan " loading={loading} submit icon={<DownloadOutlined />} />
                                </_Row>
                            </Form>
                        </Spin>
                    </div>
                </_Col>
            </_Row>
        </div>
    )
}

export default TugasTopic

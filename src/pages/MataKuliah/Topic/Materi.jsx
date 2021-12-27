import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse, Spin, Popconfirm } from 'antd';
import { PlusOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Table } from 'react-bootstrap'
import { _Button, _Input, _Number, _Select } from '../../../services/Forms/Forms';
import _MainLayouts from '../../../layouts/_MainLayouts';
import _Api, { baseURLMaster } from '../../../services/Api/_Api';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { useHistory } from 'react-router';
import { Cache } from '../../../services/Cache';
import axios from 'axios';
// import { _Number } 
// import _MainLayouts from '../../layouts/_MainLayouts';
// import _Api from '../../services/Api/_Api';
// import { _Toastr } from '../../services/Toastr/Notify/_Toastr';

function Materi(pr) {
    const kanan = { marginRight: "-15px" }
    const [dataMateri, setdataMateri] = useState([])
    const { Panel } = Collapse;
    const [loading, setloading] = useState(false)
    const [form] = Form.useForm()
    const [fileUpload, setfileUpload] = useState(null)

    const history = useHistory()

    var datatopic = JSON.parse(Cache.get("prosestopic"))
    if (!datatopic) {
        history.push("DataMatakuliah")
    }


    const simpanTopic = async (e) => {

        if (!e.detail) {
            _Toastr.error("Silahkan tambah materi ...")
            return
        }
        setloading(true)
        var bod = new FormData();
        let data = e.detail;
        await data.map((item, i) => {
            bod.append('topic', datatopic.id);
            bod.append('deskripsi', item.deskripsi);
            bod.append('file_pendukung', fileUpload);

            axios({
                method: "post",
                url: baseURLMaster + "materi/" + datatopic.id,
                data: bod,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    setloading(false)
                    loadData()
                    _Toastr.success("Suksess ...")
                })
                .catch(function (response) {
                    //handle error
                    setloading(false)
                    _Toastr.error("Gagal ...")
                });


            // _Api.post(`materi/1/${id_matakuliah}`, item).then(res => {
            //     console.log(res.data)
            // }).catch(err => {
            //     _Toastr.error("Gagal Simpan ...")
            // })
            // setloading(false)
        })
        // _Toastr.info("cek ...")
    }

    const loadData = () => {
        setloading(true)
        _Api.get(`materi/${datatopic.id}`).then(res => {
            setdataMateri(res.data)
            setloading(false)
            form.resetFields()

        })
    }

    const hapusMateri = (id) => {
        setloading(true)
        _Api.delete(`materi-detail/${id}`).then(res => {
            _Toastr.info("Suksess ...")
            loadData()
            setloading(false)
        })
    }
    useEffect(() => {
        loadData()
    }, [])

    const renderMateri = dataMateri && dataMateri.map((item, i) => {
        return (

            <tr key={i}>
                <td width="10" style={{ background: "yellow" }} style={{ textAlign: "center" }}>{i + 1} </td>
                <td width="400"> <_Input mb="-10px" style={kanan} value={item.file_pendukung} /> </td>
                <td width="500"> <_Input color="orange" mb="-10px" style={kanan} value={item.deskripsi} /> </td>
                <td width="100" style={{ textAlign: "center" }}>

                    <Popconfirm
                        title="Hapus jadwal ini  ?"
                        onConfirm={() => hapusMateri(item.id)}
                        // onCancel={cancel}
                        okText="Hapus"
                        cancelText="Batal"
                    >
                        <_Button size="small" label="Hapus" danger icon={<StopOutlined />} />

                    </Popconfirm>


                </td>
            </tr>
        )
    })


    useEffect(() => {

    }, [])
    return (
        // <_MainLayouts>

        <Form autoComplete="off" onFinish={simpanTopic} form={form} >
            <Spin spinning={loading}>
                <Table borderless size="sm">
                    <Form.List name="detail">
                        {(fields, { add, remove }) => (
                            <>
                                <thead style={{ background: "#40a9ffb5" }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>No</th>
                                        <th>File Pendukung</th>
                                        <th>Deskripsi</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderMateri}

                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <tr>
                                            <td width="10" style={{ textAlign: "center" }}> {name + 1} </td>
                                            <td width="400">
                                                <div style={{ marginBottom: "-10px", marginLeft: "10px" }}>
                                                    <input type="file" onChange={(e) => setfileUpload(e.target.files[0])} />
                                                </div>
                                            </td>
                                            <td width="500">
                                                <_Input name={[name, 'deskripsi']} mb="-10px" style={kanan}
                                                    fieldKey={[fieldKey, 'deskripsi']}
                                                    {...restField} required />
                                            </td>
                                            <td width="100" style={{ textAlign: "center" }}>
                                                <_Button color="orange" size="small" icon={<RollbackOutlined />} onClick={() => remove(name)} label="Batal" />
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                                <br />
                                <_Button onClick={() => {
                                    if (fields.length == 0) {
                                        add()
                                        // setloading(false)
                                    }

                                }} icon={<PlusOutlined />} />
                                {/* <p>
                                    <Form.Item>
                                        <br />
                                        <Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                                            Tambah
                                        </Button>
                                    </Form.Item>
                                </p> */}
                            </>
                        )}
                    </Form.List>
                </Table>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Simpan Materi
                    </Button>
                    {/* <_Switch titleCheck="Ya" titleUnCheck="Tidak" onChange={(e, f) => console.log(f.target.firstChild.data)} /> */}
                </Form.Item>

            </Spin>
        </Form>

        // </_MainLayouts>

    )
}

export default Materi

import React, { useState } from 'react'
import { Form, Input, Button, Space, Badge, Descriptions, Collapse, Spin } from 'antd';
import { PlusOutlined, RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { Row, Table } from 'react-bootstrap'
import { _Button, _Input, _Number, _Select } from '../../../services/Forms/Forms';
import _MainLayouts from '../../../layouts/_MainLayouts';
import _Api from '../../../services/Api/_Api';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
// import { _Number } 
// import _MainLayouts from '../../layouts/_MainLayouts';
// import _Api from '../../services/Api/_Api';
// import { _Toastr } from '../../services/Toastr/Notify/_Toastr';

function Topic(pr) {
    const kanan = { marginRight: "-15px" }
    const [detailProduk, setdetailProduk] = useState({})
    const { Panel } = Collapse;
    const [loading, setloading] = useState(false)
    const [form] = Form.useForm()


    const simpanTopic = async (e) => {
        // console.log(e.detail)
        setloading(true)
        let id_matakuliah = pr.datamatkul.id_mk

        let data = e.detail;

        await data.map((item, i) => {
            let obj = { ...item, "subject": id_matakuliah }

            _Api.post(`topic/${id_matakuliah}`, obj).then(res => {
                _Toastr.success("Suksess.")
                // pr.clear()
                pr.loadData()
                pr.close()
            }).catch(err => {
                _Toastr.error("Gagal Simpan ...")
            })
            setloading(false)
            form.resetFields()
        })

    }
    return (
        // <_MainLayouts>

        <Form autoComplete="off" onFinish={simpanTopic} form={form} >

            <_Row >
                <_Col sm={4} />
                <_Input label='Mata Kuliah' sm={8} value={pr.datamatkul && pr.datamatkul.nama_mk} />
                {/* <p> {JSON.stringify(pr.datamatkul)} </p> */}
            </_Row>

            <Spin spinning={loading}>
                <Table borderless size="sm">
                    <Form.List name="detail">
                        {(fields, { add, remove }) => (
                            <>
                                <thead style={{ background: "#40a9ffb5" }}>
                                    <tr>
                                        <th style={{ textAlign: "center" }}>No</th>
                                        <th>Topic / Materi</th>
                                        <th>Url Video</th>
                                        <th>Deskripsi</th>
                                        <th></th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <tr>
                                            {/* "id_matakuliah" : 4,
                                            "topic": "Topinya apa saja 1",
                                            "deskripsi": "Oke Yaa", */}
                                            <td width="10" style={{ textAlign: "center" }}> {name + 1} </td>
                                            <td width="470" >
                                                <_Input name={[name, 'topic_name']} mb="-10px" style={kanan}
                                                    fieldKey={[fieldKey, 'topic_name']}
                                                    {...restField} required />
                                            </td>
                                            <td width="400">
                                                <_Input name={[name, 'video']} mb="-10px"
                                                    style={kanan} format
                                                    fieldKey={[fieldKey, 'video']}
                                                    {...restField} required />
                                            </td>
                                            <td width="300">
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
                                <_Button onClick={() => add()} icon={<PlusOutlined />} />
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
                        Simpan Topik
                    </Button>
                    {/* <_Switch titleCheck="Ya" titleUnCheck="Tidak" onChange={(e, f) => console.log(f.target.firstChild.data)} /> */}
                </Form.Item>

            </Spin>
        </Form>

        // </_MainLayouts>

    )
}

export default Topic

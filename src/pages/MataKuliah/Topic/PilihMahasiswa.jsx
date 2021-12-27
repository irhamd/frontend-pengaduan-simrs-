import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Spin, Transfer, Form } from 'antd';


import { DivCol, _Button, _Checkbox, _Input, _RadioGroup, _Switch, _Text, _TitleBar } from '../../../services/Forms/Forms';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { useHistory } from 'react-router';
import _Api from '../../../services/Api/_Api';
import { DownloadOutlined, RollbackOutlined } from '@ant-design/icons';
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';


function PilihMahasiswa(pr) {

    const [st, setState] = useState({
        // initialData : []
    })
    const [targetKeys, setTargetKeys] = useState();
    const [selectMahasiswa, setselectMahasiswa] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [loading, setloading] = useState(false);
    const [dataMahasiswa, setdataMahasiswa] = useState([]);

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        // console.log('sourceSelectedKeys:', sourceSelectedKeys);
        // console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
 

    const onChange = (list, direction, moveKeys) => {
        // console.log('targetKeys:', list);
        // console.log('direction:', direction);
        // console.log('moveKeys:', moveKeys);
        setTargetKeys(list);
        setselectMahasiswa(moveKeys)
    };

    const simpanMahasiswa = async () => {
        var obj = []
        setloading(true)
        await selectMahasiswa && selectMahasiswa.map(val => {
            obj.push({
                "topic": pr.id_topic,
                "member": val
            })
        })

        // console.log("obj", obj)
        _Api.post(`topic-member/${pr.id_mk}`, obj).then(res => {
            _Toastr.success('Sukses ...')
            setloading(false)
            setdataMahasiswa([])
            setTargetKeys([])
            loadData()
            pr.loadDataMahasiswa()
        }).catch(err => {
            setloading(false)
            _Toastr.error('Gagal ..')
        })
    }

    const loadData = () => {
        setloading(true)
        _Api.get(`materi-member/${pr.id_mk}/list`).then(res => {
            setdataMahasiswa(res.data)
            setloading(false)
        })

    }

    useEffect(() => {
        loadData()
    }, [])

    const filterOption = (inputt, option) => option.student.user.first_name.indexOf(inputt) > -1;

    return (
        <div>
            <Card title={" Pilih mahasiswa"} size="small">

                <br />
                <_Row>
                    <_Col style={{ paddingLeft: "25px" }}>
                        <Spin spinning={loading} >
                            <Transfer
                                rowKey={record => record.id}
                                rowTitle={record => record.stduent.user.first_name}
                                dataSource={dataMahasiswa}
                                showSearch
                                filterOption={filterOption}
                                oneWay
                                titles={['Mahasiswa', 'Mahasiswa Masuk']}
                                targetKeys={targetKeys}
                                selectedKeys={selectedKeys}
                                onChange={onChange}
                                operations={['Tambah', 'Batal']}
                                onSelectChange={onSelectChange}
                                // onScroll={onScroll}
                                render={item => item.student.user.first_name + " [ " + item.student.nim + " ]"}
                                listStyle={{ height: "500px", fontSize: "56", width: "400px", marginBottom: "40px", background: "white" }}
                            />
                        </Spin>
                    </_Col>
                    <_Col sm={5} />
                    <_Button sm={3} block label="Batal" onClick={pr.tutup} color="red" icon={<RollbackOutlined />} />
                    <_Button sm={4} block label="Simpan" onClick={simpanMahasiswa} icon={<DownloadOutlined />} />
                </_Row>
                <br />
                <br />
                <br />

            </Card>
        </div>
    )
}

export default PilihMahasiswa

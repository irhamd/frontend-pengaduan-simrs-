import { NodeExpandOutlined, SwapOutlined } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import _Api from '../../services/Api/_Api';
import { Cache } from '../../services/Cache';
import { _Button } from '../../services/Forms/Forms';
import { _Toastr } from '../../services/Toastr/Notify/_Toastr';

function ExpandTopic(pr) {
    const [detail, setDetail] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setloading] = useState(true)
    const histori = useHistory();

    const loadData = () => {
        setloading(true)
        _Api.get(`topic/${pr.data.id_mk}`).then(res => {
            setDetail(res.data)
            setloading(false)

        })
    };
    const prosesTopik = (data) => {
        setloading(true)
        _Api.get(`subject-detail/${pr.data.id_mk}`).then(res => {
            setloading(false)
            // let cek = {...data, ...res.data}
            let enc = JSON.stringify({ ...data, ...res.data })
            Cache.set("prosestopic", enc)
            histori.push("/ProsesTopik")
        })



    }


    const columns = [
        {
            title: '', width: 150,
            render: (text, row) => (
                < div style={{ textAlign: "center" }}> <_Button onClick={() => prosesTopik(row)} label="Proses" icon={<NodeExpandOutlined />} /> </div>
            ),
        },
        {
            title: 'No', width: 50,
            render: (text, row, index) => (
                < div style={{ textAlign: "center" }}> {index + 1} </div>
            ),
        },
        { title: 'Topic / Materi', dataIndex: 'topic_name', width: 300 },
        { title: 'Deskripsi', dataIndex: 'deskripsi', width: 500 },
        { title: 'Video', dataIndex: 'video', width: 300 },



    ];

    useEffect(() => {
        loadData()
    }, [])

    const hapusTopic = () => {
        // console.log(selected)
        selected.selectedRowKeys.map(item => {
            _Api.delete("topic-detail/" + item).then(res => {
                loadData()
                _Toastr.success("Suksess ...")
                setSelected([])
            }).catch(err => {
                _Toastr.error("Gagall ...")
            })
        })
    }


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelected({ ...selected, selectedRowKeys })
        }
    };

    return (
        <div style={{ paddingLeft: "40px", background: "rgb(113 189 251 / 31%)" }}>
            <Table
                columns={columns}
                rowSelection={rowSelection}
                rowKey="id"
                loading={loading}
                pagination={false}
                scroll={{ x: 100, y: 2000 }}
                dataSource={detail}
                summary={pageData => {
                    return (
                        <Table.Summary.Row>
                            <Table.Summary.Cell ></Table.Summary.Cell>
                            <Table.Summary.Cell ></Table.Summary.Cell>
                            <Table.Summary.Cell ></Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={2}>

                                {selected.selectedRowKeys && selected.selectedRowKeys.length > 0 &&
                                    <div style={{ display: "flex" }}>
                                        <Popconfirm title={`Batal Kirim barang .? ?`} okText="YA" cancelText="Tidak"
                                            onConfirm={hapusTopic}
                                        >
                                            <_Button block sm={3} color="grey" size="small" icon={<SwapOutlined />} title="Hapus Topic" />
                                        </Popconfirm>
                                        {/* <_Button block sm={3} color="red" size="small" title="Hapus" /> */}
                                    </div>
                                }
                            </Table.Summary.Cell>

                        </Table.Summary.Row>
                    )
                }}
            // className={tableCSS}

            />
        </div>
    )
}

export default ExpandTopic

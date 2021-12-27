import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Descriptions, Spin, Transfer, Form } from 'antd';


import { DivCol, _Button, _Checkbox, _Input, _RadioGroup, _Switch, _Text, _TitleBar } from '../../../services/Forms/Forms';
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap';
import { useHistory } from 'react-router';
import _Api from '../../../services/Api/_Api';
import { DeleteOutlined, DownloadOutlined, RollbackOutlined, UserDeleteOutlined } from '@ant-design/icons';
import mhs from "./../../../assets/img/avatars/mhs.png"

function ListMahasiswa(pr) {

    const [loading, setloading] = useState(true);
    const [idd, setidd] = useState(null);





    const deleteMahsiswaDiTopic = (id_mahasiswa) => {
        setidd(id_mahasiswa)
        _Api.delete(`topic-member-detail/${id_mahasiswa}`).then(res => {
            // setdataMahasiswa(res.data)
            // console.log(`res.data mahasiswa`, res.data)
            pr.loadDataMahasiswa()
            setidd(null)


        })
    }

    useEffect(() => {
        pr.loadDataMahasiswa()
    }, [])




    return (
        <div>
            <Card title={" * List Mahasiswa"} size="small">
                <br />
                <List
                    itemLayout="vertical" size="small" pagination={{ pageSize: 5 }}
                    dataSource={pr.dataMahasiswa}
                    renderItem={(item, i) => (
                        <List.Item extra={<p>
                            <_Button loading={item.id == idd ? true : false} danger
                                label="Hapus"
                                icon={<DeleteOutlined />}
                                onClick={() => deleteMahsiswaDiTopic(item.id)} />
                        </p>
                        }>
                            <List.Item.Meta
                                avatar={<Avatar src={mhs} />}
                                // title={<a>{JSON.stringify(item)}</a>}
                                title={` ${i + 1} .  ${item.member && item.member.student.user.first_name}`}
                                description={
                                    <a style={{ marginTop: "-10px", position: "absolute" }}>
                                        {item.member.nim ? item.member.student.nim : <small> tidak ada NIM </small>} |
                                        {item.member.no_hp ? item.member.student.no_hp : <small> tidak ada nomor HP </small>}
                                    </a>}

                            />
                        </List.Item>
                    )}
                />,
            </Card>
        </div>
    )
}

export default ListMahasiswa

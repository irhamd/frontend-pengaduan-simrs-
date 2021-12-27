import React, { useEffect, useState } from "react";

import { Descriptions, Tabs, Collapse, Upload, Drawer, } from "antd";
import { PlayCircleTwoTone, ReloadOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import _MainLayouts from "../../../layouts/_MainLayouts";
import _Api from "../../../services/Api/_Api";
import { _Button, _Checkbox, _Date, _Input, _Label, _Select, _Switch, _TitleBar } from "../../../services/Forms/Forms";
import { _Col, _Row } from "../../../services/Forms/LayoutBootstrap";
import { _Toastr } from "../../../services/Toastr/Notify/_Toastr";
import JadwalPembelajaran from "./JadwalPembelajaran";
import UploadMateri from "./UploadMateri";
import PilihMahasiswa from "./PilihMahasiswa";
import { Cache } from "../../../services/Cache";
import { fitrah } from "../../../services/Text/GlobalText";
import { dataUser } from "../../../services/Cache/Auth";
import Materi from "./Materi";
import ListMahasiswa from "./ListMahasiswa";
import InputJadwal from "./InputJadwal";
import TugasTopic from "./TugasTopic";

function ProsesTopik() {
    const [input, setinput] = useState(false)
    const [dataDos, setdataDos] = useState([])
    const [selected, setselected] = useState("")
    const [loadingDel, setloadingDel] = useState(false)
    const [intialData, setintialData] = useState(null)
    const angkaTerbilang = require('angka-menjadi-terbilang')

    const { TabPane } = Tabs;
    const { Panel } = Collapse;
    const [pilihMahasiswa, setpilihMahasiswa] = useState(false)
    const [dataMahasiswa, setdataMahasiswa] = useState([]);

    var datatopic = JSON.parse(Cache.get("prosestopic"))

    console.log(`datatopic`, datatopic)



    const loadDataMahasiswa = () => {
        _Api.get(`topic-member/${datatopic.id}`).then(res => {
            setdataMahasiswa(res.data)
        })
    }
 
    return (
        <_MainLayouts>

            <Drawer width="800" title="Pilih Mahasiswa" placement="right" onClose={() => setpilihMahasiswa(false)} visible={pilihMahasiswa}>
                {pilihMahasiswa &&
                    <PilihMahasiswa
                        id_mk={datatopic.id_mk}
                        id_topic={datatopic.id}
                        loadDataMahasiswa={loadDataMahasiswa}
                        tutup={() => setpilihMahasiswa(false)}
                        onClose={false} />
                }
            </Drawer>

            <div
                className="site-drawer-render-in-current-wrapper"
                style={{ height: "100vh", overflowY: "auto" }}
            >
                <Descriptions
                    bordered
                    size={"small"}
                    column={2}
                    contentStyle={{ background: "rgb(64 169 255 / 13%)", fontWeight: "bold" }}
                    labelStyle={{ textAlign: "right" }}
                >
                    <Descriptions.Item label="Matakuliah ">{datatopic.nama_mk}</Descriptions.Item>
                    <Descriptions.Item label="Satuan Kredit Semester">{datatopic.sks} ({angkaTerbilang(datatopic.sks)})</Descriptions.Item>
                    <Descriptions.Item label="Dosen ">{dataUser.name}</Descriptions.Item>
                    <Descriptions.Item label="Deskripsi ">{datatopic.deskripsi}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Topik "> <span style={{ fontSize: "17px" }}> {datatopic.topic_name} </span></Descriptions.Item>

                </Descriptions>

                {/* <_TitleBar label="Data Dosen" /> */}
                <p style={{ marginBlock: "10px" }}></p>



                <_Col sm={12}>
                    <Collapse bordered collapsible
                        style={{ background: "#40a9ff1c" }}
                        expandIcon={({ isActive }) => <PlayCircleTwoTone rotate={isActive ? 90 : 0} />}
                        defaultActiveKey={[1, 2, 3]}
                    >
                        <Panel header="Mahasiswa" key="5">
                            <ListMahasiswa id_topic={datatopic.id} loadDataMahasiswa = {loadDataMahasiswa} dataMahasiswa={dataMahasiswa} />
                            <hr />
                            <_Row>
                                <_Col sm={8} />
                                <_Button block sm={1} icon={<ReloadOutlined />} loading={loadingDel} color="orange" />
                                <_Button block sm={3} icon={<UsergroupAddOutlined />} loading={loadingDel} label="Pilih Mahasiswa" onClick={() => setpilihMahasiswa(true)} color="orange" />
                            </_Row>
                            <br />

                        </Panel>
                        <Panel header="Jadwal Pembelajaran" key="1">
                            <div>
                                <JadwalPembelajaran idtopic={datatopic.id} />
                            </div>
                        </Panel>
                        {/* <Panel header="Upload Materi" key="2" >
                            <UploadMateri />
                            <br />
                        </Panel> */}
                        <Panel header="Materi" key="3">
                            <Materi />

                        </Panel>

                        <Panel header="Tugas" key="4">
                            <TugasTopic />

                        </Panel>




                    </Collapse>
                </_Col>




            </div>
        </_MainLayouts>
    );
}

export default ProsesTopik;

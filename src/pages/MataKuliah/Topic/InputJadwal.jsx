import { DownloadOutlined, FormatPainterFilled, IssuesCloseOutlined } from '@ant-design/icons'
import React from 'react'
import { Card, Form } from "antd"
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { _Button, _Date, _Input, _Label, _Select, _Time, _TitleBar } from '../../../services/Forms/Forms'
import { _Col, _Row } from '../../../services/Forms/LayoutBootstrap'
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr'
import _Api from '../../../services/Api/_Api'
import { formatTgl, formatTglWaktu } from '../../../services/Text/GlobalText'
import moment from 'moment'
import { format } from 'crypto-js'


function InputJadwal({ idtopic, loadData }) {

    // const langsung = useHistory();

   const  [form] = Form.useForm();

    const simpanJadwal = (event) => {

        let obj = {
            "topic":idtopic ,
            "date": moment(event.date).format('YYYY-MM-DD'),
            "time": moment(moment.time).format('HH:mm')
        }
        _Api.post("topic-jadwal/" + idtopic, obj).then(respond => {
            // console.log(respond.data)
            _Toastr.success("Suksess ...!")
            form.resetFields()
            loadData()
            // langsung.push("JadwalPembelajaran")
        }).catch(errrroorrr => console.log("errorrrr"))
    }

    return (
        <div>
            <_Label label="Input Jadwal" />
            <Form layout="vertical" form ={form} onFinish={simpanJadwal}   >
                <_Row>
                    <_Date format='YYYY-MM-DD' label="Tanggal" sm={6} name="date" required />
                    <_Time label="Jam" sm={6} name="time" required />
                </_Row>
                <br />
                <_Row>
                    <_Col sm={7} />
                    <_Button sm={5} block label="Simpan " submit icon={<DownloadOutlined />} />
                </_Row>
            </Form>

        </div>
    )
}

export default InputJadwal

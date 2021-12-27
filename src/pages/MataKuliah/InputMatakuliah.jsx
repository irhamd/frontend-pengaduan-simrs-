import { DownloadOutlined, IssuesCloseOutlined } from '@ant-design/icons'
import { Card, Form } from "antd"
// import Form from 'rc-field-form/es/Form'
import React from 'react'
import { useHistory } from 'react-router'
import _MainLayouts from '../../layouts/_MainLayouts'
import _Api from '../../services/Api/_Api'
import { _Button, _Input, _Select, _TitleBar } from '../../services/Forms/Forms'
import { _Col, _Row } from '../../services/Forms/LayoutBootstrap'
import { _Toastr } from '../../services/Toastr/Notify/_Toastr'

function InputMatakuliah(pr) {
    return (
        <div>
                <Form layout="vertical" onFinish={pr.simpanMatkul} form={pr.formMatakuliah}   >
                    <_Input label="Nama Matakuliah" sm={6} name="nama_mk" required />
                    <_Input label="SKS" sm={3} name="sks" required />
                    <_Input label="Deskripsi" sm={6} name="deskripsi" required />
                    <br />
                    <_Row>
                        <_Col sm={6} />
                        <_Button sm={3} block label="Simpan " submit icon={<DownloadOutlined />} />
                        <_Button sm={3} block label="Tutup" color="red" onClick={pr.close} />
                    </_Row>
                </Form>

         
        </div >

    )
}

export default InputMatakuliah

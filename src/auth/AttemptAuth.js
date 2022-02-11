import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { AppstoreOutlined, KeyOutlined, MailOutlined, PoweroffOutlined, UnlockOutlined, IdcardTwoTone, SmileTwoTone, BulbTwoTone, UnlockTwoTone, UserOutlined, HighlightFilled, ImportOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import { _Button, _Checkbox, _Input, _Switch } from '../services/Forms/Forms';
import { globalText } from '../services/Text/GlobalText';
import { acakText } from '../services/Crypto';
// import _Api from '../services/Api/_ApiBase';
import { _Toastr } from '../services/Toastr/Notify/_Toastr';
import { LogOut } from '.';
// import _ApiBase from '../services/Api/_ApiBase';
import axios from 'axios';
import { baseURL } from '../services/Api/_Api';
import logo from "./../assets/img/logo.png"
import _Nav from '../layouts/_Nav';
import { _Col, _Row } from '../services/Forms/LayoutBootstrap';
import { ResponsiveAreaBump } from '@nivo/bump'


function AttemptAuth() {

    const histori = useHistory();
    const [obj, setobj] = useState({})
    const [username, setUsername] = useState()
    const [password, setpassword] = useState()
    // const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        LogOut();
    }, [])

    const attemptLogin = (val) => {

        console.log(`val`, val)
        setLoading(true)
        // window.location.href = "/home";



        axios.post(`${baseURL}loginRev`, val).then(res => {
            const data = res.data;
            console.log(`data`, data)
            // console.log(res)

            if (data) {
                let user = JSON.stringify(data.user);
                sessionStorage.setItem(globalText.x_auth_resu, acakText(user))
                sessionStorage.setItem(globalText.x_auth_user, acakText("!@#$%^&*()_+"))
                sessionStorage.setItem(globalText.x_auth_access_token, acakText(data.token))
                sessionStorage.setItem(globalText.x_auth_refresh_token, acakText(data.refresh_token))
                sessionStorage.setItem(globalText.authorization, acakText(data.role))
                window.location.href = "/home";
            } else {
                _Toastr.error("Akses di tolak ...")
                setLoading(false)
                return
            }
            // setError(false)
        }).catch(err => {
            setLoading(false)
            _Toastr.error("Gagal terhubung ke server, Periksa jaringan anda ...")

        })

    }


    return (
        <div style={{ background: "linear-gradient(white 70%, white)", height: "100vh", overflow: "auto" }} >

            <_Nav />
            <br /> <br /> <br /> <br />
            <_Row>
                <_Col sm={5} />

                <_Col sm={3} style={{ background: "#00ab3dba", padding: "40px", marginTop: "100px", boxShadow: "5px 5px #888888" }} >
                    <div style={{ textAlign: "center" }}>
                        <p><img width="250" src={logo} alt="" /></p>
                        <p style={{ textAlign: "center", fontWeight: "bolder" }}> <span style={{ color: "#258fe6f7" }}> PENGADUAN
                        </span> ONLINE </p>

                    </div>
                    <Form onFinish={attemptLogin}
                        layout={"vertical"}
                        // labelCol={{ span: "8" }}
                        // wrapperCol={{ span: "12" }}
                        style={{ color: "white" }}
                    >
                        <_Input label="Username" name="name" />
                        <_Input label="Password" password name="password" />
                        <_Switch sm={10} label="Ingatkan saya" name="remember" />
                        <_Button label="Sign In" sm={2} submit loading={loading} />
                    </Form>
                    <br />
                    <p style={{ textAlign: "center", width: "100%" }}> Copyright ©2021 FHDev@team.com All Rights Reserved </p>

                </_Col>

            </_Row>

        </div>

    )
}

export default AttemptAuth

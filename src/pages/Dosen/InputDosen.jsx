import { DownloadOutlined, IssuesCloseOutlined } from "@ant-design/icons";
import { Drawer, Form } from "antd";
import React, { useEffect, useState } from "react";
import _Api from "../../services/Api/_Api";
import { _Button, _Date, _Input } from "../../services/Forms/Forms";
import { _Col, _Row } from "../../services/Forms/LayoutBootstrap";
import { _Toastr } from "../../services/Toastr/Notify/_Toastr";

function InputDosen({ data, tutup, loadData, input }) {
  const [form] = Form.useForm();

  const [result, setresult] = useState("");
  const [loading, setloading] = useState(false);

  const simpanDosen = (e) => {
    setloading(true)
    var cek = data ? _Api.put("dosen/" + data.kode, e) : _Api.post("dosen", e)

    cek.then(res => {
      _Toastr.success("Suksess ...");
      setloading(false)
      form.resetFields()
      tutup()
      loadData()
    }).catch(err => {
      _Toastr.error("Gagall ...")
      setloading(false)
    })

  };

  useEffect(() => {
    if (data) {

      form.setFieldsValue({
        nama: data.user.first_name,
        no_telp: data.no_telp,
        email: data.user.email,
        username: data.user.username,
      })
    }
  }, [])

  const resetForm = () => {
    // let cek = form.getFieldValue("nohp");
    // alert(cek);
    form.setFieldsValue()
    // form.resetFields();
  };

  return (
    <Drawer
      title="Input Dosen Baru" placement="top" bodyStyle={{ background: "rgba(102, 198, 236, 0.18)" }} height="" closable={false}
      visible={input} getContainer={false} style={{ position: "absolute" }}>
      <Form
        form={form}
        layout={"vertical"}
        onFinish={simpanDosen}
        onFinishFailed={() => _Toastr.error("Cek inputan data ...")}
      // initialValues = {pr.data}
      // initialValues={{
      //   namadosen: "Hariri",
      //   nohp: "087787888",
      // }}
      >
        <_Input label="Nama Dosen" sm={6} name="nama" required />
        <_Input label="No. HP" sm={3} name="no_telp" required />
        <_Input label="Email" type="email" required sm={6} name="email" />
        <_Input label="User Name" sm={6} name="username" required />
        {!data && <div>
          <_Input label="Password" sm={6} name="password" password required />
          <_Input label="Password Lagi" sm={6} name="passwordlagi" password required />
        </div>
        }
        <_Row>
          <_Col sm={6} /> 
          <_Button
            sm={2}
            block
            color="orange"
            label="Cek Edit"
            onClick={resetForm}
            icon={<IssuesCloseOutlined />}
          />
          <_Button
            sm={3}
            block
            label="Simpan"
            submit
            loading={loading}
            icon={<DownloadOutlined />}
          />
          <_Button
            sm={1}
            block
            label="Tutup"
            onClick={tutup}
            color="red"
          />
        </_Row>
      </Form>
    </Drawer>
  );
}

export default InputDosen;

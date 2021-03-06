import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select } from "antd"
import { Col as ColB } from 'react-bootstrap';

import { Spin } from 'antd';
import _Api from '../Api/_Api';

const { Option } = Select;

let timeout;
let iniValue;
const _margintTop = "-20px"

export function fetchData(api, field, value, search, val, lain) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    iniValue = value;

    const getApi = () => {
        // console.log(`getMasterTindakan?namatindakan=${value}`)
        _Api.get(`${api}?${field}=${value}`)
            // .then(response => response.json())
            .then(d => {
                if (iniValue == value) {
                    const result = d.data.data;
                    const data = [];
                    result.map(item => {
                        data.push({
                            value: val ? item[val] : item.id,
                            text: item[search],
                        });
                    })
                    lain(data);
                }
            });
    }

    timeout = setTimeout(getApi, 200);
}

export default function _AutocompleteRev(r) {
    const [data, setdata] = useState([])
    // const [allData, setallData] = useState([])
    // const [value, setvalue] = useState(undefined)
    // const [isubah, setisubah] = useState(false)

    // useEffect(() => {
    //     r.defaultValue
    // }, [])
    const handleSearch = value => {
        if (value) {
            // fetchData('getMasterTindakan', 'namatindakan', value, data => setdata(data));
            // setisubah(true)
            fetchData(r.route, r.field, value, r.search, r.val, data => setdata(data));
        } else {
            setdata([])
            // setisubah(false)
        }
    };

    // const handleSelect = (e, f) => {
    //     if (allData && r.callback) {
    //         let cek = allData.find(x => x.id == parseInt(e));
    //         // console.log(cek)
    //         r.callback(cek)
    //     } else
    //         console.log('tidak ada data data autocomplete... ')
    // };

    // const handleChange = value => {
    //     setvalue({ value });
    // };
    // let getDefaultValue = r.defaultValue && <Option key={r.defaultValue[0]}>{r.defaultValue[1]}</Option>
    const options =  data.map(d => <Option key={d.value}>{d.text}</Option>);

    return (

        <ColB sm={r.sm ? r.sm : 12}>
            <Form.Item name={r.name ? r.name : " "} required={r.required} label={r.label ? r.label : ""}
                hasFeedback style={{ ...r.style, marginBottom: r.mb ? r.mb : "10px" }}
                restField={r.restField} fieldKey={r.fieldKey}
                rules={[{ required: r.required, message: r.message ? r.message : 'Harus diisi.' }]}
            >
                <Select
                    showSearch
                    allowClear
                    // value={value.value}
                    // placeholder={this.props.placeholder}
                    // style={this.props.style}
                    // defaultActiveFirstOption={false}
                    // showArrow={false}
                    placeholder={r.placeholder}
                    // onSelect={handleSelect}
                    bordered
                    defaultValue={r.defaultValue}
                    filterOption={false}
                    onSearch={handleSearch}
                    onChange={r.onChange}
                    notFoundContent={<Spin size="small"> Muat data ... </Spin>}
                >
                    {options}
                    {/* <option value="OKE" key="1"></option> */}
                </Select>
            </Form.Item>
        </ColB>
    )
}

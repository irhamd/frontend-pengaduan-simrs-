import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import React from 'react'
import { _Toastr } from '../../../services/Toastr/Notify/_Toastr';

function UploadMateri() {
    const { Dragger } = Upload;

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                _Toastr.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                _Toastr.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            // console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Silahkan Upload File Materi Anda</p>
                <p className="ant-upload-hint">
                    Klik atau seret beberapa file anda ke kotak ini .
                    <p>
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </p>
            </Dragger>,
        </div>
    )
}

export default UploadMateri

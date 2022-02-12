import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { updateFavorite } from '../../actions/favorites';






const AddFavoriteMovie = (props: UpdateFavoriteProps) => {
    const { handleCancel, favoriteToUpdate } = props;
    const initialState = { name: favoriteToUpdate.name , image: favoriteToUpdate.image };
    const [updateFavoriteForm, setUpdateFavoriteForm] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();




    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(updateFavorite(updateFavoriteForm, favoriteToUpdate.id));
        handleCancel();
        form.resetFields(["name", "image"]);
        window.location.reload();
    };

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setUpdateFavoriteForm({ ...updateFavoriteForm, [e.target.name]: e.target.value });

    const handleFileUpload = async (e: any) => {
        let file = e.fileList[0].originFileObj;
        let reader = new FileReader();
        reader.onload = function () {
            let base64String = reader.result;
            let imageData = base64String as string;

            setUpdateFavoriteForm({ ...updateFavoriteForm, image: imageData });
        }
        reader.readAsDataURL(file);
    };




    return (


        <Form
            name="basic"
            form={form}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
                ["name"]: favoriteToUpdate.name
                
            }}
            onFinish={handleUpdate}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Input name="name"  maxLength={50} onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Image"
                name="image"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                ]}
            >
                <Upload name={"image"} accept={".jpg,.jpeg"} maxCount={1} onChange={(info) => { handleFileUpload(info) }} >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>


            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>



    );
};

export default AddFavoriteMovie;
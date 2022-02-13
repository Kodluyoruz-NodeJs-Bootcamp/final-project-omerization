import React, {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createFavorite } from '../../actions/favorites';

const initialState = { name: '', type: 'movie', image: "" };

const AddFavoriteMovie = (props: AddFavoriteProps) => {
    const [favoriteForm, setFavoriteForm] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { handleCancel } = props;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(createFavorite(favoriteForm, navigate));
        handleCancel();
        form.resetFields(["name", "image"]);
        window.location.reload();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFavoriteForm({ ...favoriteForm, [e.target.name]: e.target.value });

    const handleFileUpload = async (e: any) => {
        let file = e.fileList[0].originFileObj;
        let reader = new FileReader();
        reader.onload = function () {
            let base64String = reader.result;
            let imageData = base64String as string;
            setFavoriteForm({ ...favoriteForm, image: imageData });
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
            }}
            onFinish={handleSubmit}
            autoComplete="off"
        >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your favorite name!' }]}>
                <Input name="name" maxLength={50} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please add an image of movie' }]}>
                <Upload name={"image"} accept={".jpg,.jpeg"} maxCount={1} onChange={(info) => { handleFileUpload(info) }} >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddFavoriteMovie;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { getUserFavoriteActors } from '../../actions/favorites';
import { createPost } from '../../actions/posts';
import { RootState } from '../../reducers';
import 'antd/dist/antd.css';


const { TextArea } = Input;
const { Option } = Select;

const initialActorForm = { review: '', favorite: '' };

const ActorForm = (props: UpdatePostProps) => {

    const [postActorForm, setPostActorForm] = useState(initialActorForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { postToUpdate, handleCancel } = props;

    useEffect(() => {
        dispatch(getUserFavoriteActors(postToUpdate.owner));
    }, [dispatch]);

    const favoriteActors = useSelector((state: RootState) => state.favoriteActors);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(createPost(postActorForm, navigate));
        handleCancel();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setPostActorForm({ ...postActorForm, [e.target.name]: e.target.value });

    const handleSelect = (value: string) => setPostActorForm({ ...postActorForm, favorite: value });

    return (
        <Form
            name="basic"
            form={form}
            initialValues={{
                remember: true,
                ["favorite"]: postToUpdate.favorite
            }}
            onFinish={handleSubmit}
            autoComplete="off"
            style={{ paddingTop: 20 }}
        >
            <div> Select one of your favorite actors:</div>
            <Form.Item
                name="favorite"
                initialValue={postToUpdate.favorite}
            >
                <Select
                    showSearch
                    defaultValue={postToUpdate.favorite}
                    placeholder="Select a movie"
                    optionFilterProp="children"
                    onChange={(value) => {
                        handleSelect(value)
                    }}
                >
                    {favoriteActors.map((favorite: FavoriteProps) => (
                        <Option value={favorite.name} >{favorite.name}</Option>

                    ))};
                </Select>
            </Form.Item>
            <Form.Item>
                <div>  Your thoughts about this Actor:</div>
                <TextArea name="review" defaultValue={postToUpdate.review} onChange={handleChange} placeholder="What I liked most about this movie is..." autoSize />
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

export default ActorForm;
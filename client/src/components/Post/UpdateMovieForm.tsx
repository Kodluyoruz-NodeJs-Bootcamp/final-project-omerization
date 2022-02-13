import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { getUserFavoriteMovies } from '../../actions/favorites';
import { updatePost } from '../../actions/posts';
import { RootState } from '../../reducers';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Option } = Select;

const initialMovieForm = { review: '', favorite: '' };

const MovieForm = (props: UpdatePostProps) => {

    const [postMovieForm, setPostMovieForm] = useState(initialMovieForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { postToUpdate, handleCancel } = props;

    useEffect(() => {
        dispatch(getUserFavoriteMovies(postToUpdate.owner));
    }, [dispatch]);

    const favoriteMovies = useSelector((state: RootState) => state.favoriteMovies);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(updatePost(postMovieForm, postToUpdate.id));
        handleCancel();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setPostMovieForm({ ...postMovieForm, [e.target.name]: e.target.value });

    const handleSelect = (value: string) => setPostMovieForm({ ...postMovieForm, favorite: value });

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
            <div> Select one of your favorite movies:</div>
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
                    {favoriteMovies.map((favorite: FavoriteProps) => (
                        <Option   value={favorite.name} >{favorite.name}</Option>
                        
                    ))};
                </Select>
            </Form.Item>
            <Form.Item>
                <div>  Your thoughts about this movie:</div>
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

export default MovieForm;
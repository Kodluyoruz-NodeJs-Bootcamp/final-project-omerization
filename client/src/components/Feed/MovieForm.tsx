import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
import { getUserFavoriteMovies } from '../../actions/favorites';
import { createPost } from '../../actions/posts';
import { RootState } from '../../reducers';
import 'antd/dist/antd.css';


const { TextArea } = Input;
const { Option } = Select;

const initialMovieForm = { review: '', favorite: '' };

const MovieForm = (props: MovieFormProps) => {

    const [postMovieForm, setPostMovieForm] = useState(initialMovieForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { user, handleCancel, isMovieFormVisible } = props;

    useEffect(() => {
        dispatch(getUserFavoriteMovies(user.result.id));
    }, [dispatch]);

    const favoriteMovies = useSelector((state: RootState) => state.favoriteMovies);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        dispatch(createPost(postMovieForm, navigate));
        handleCancel();
        form.resetFields(["name", "image"]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setPostMovieForm({ ...postMovieForm, [e.target.name]: e.target.value });

    const handleSelect = (value: string) => setPostMovieForm({ ...postMovieForm, favorite: value });

    return (
        <Form
            name="basic"
            form={form}
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
            style={{ display: isMovieFormVisible ? 'block' : 'none', paddingTop: 20 }}
        >
            <div> Select one of your favorite movies:</div>
            <Form.Item
                name="favorite"
            >
                <Select
                    showSearch
                    placeholder="Select a movie"
                    optionFilterProp="children"
                    onChange={(value) => {
                        handleSelect(value)
                    }}
                >
                    {favoriteMovies.map((favorite: FavoriteProps) => (
                        <Option value={favorite.name}>{favorite.name}</Option>
                    ))};

                </Select>
            </Form.Item>
            <Form.Item>
                <div>  Your thoughts about this movie:</div>
                <TextArea name="review" onChange={handleChange} placeholder="What I liked most about this movie is..." autoSize />
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
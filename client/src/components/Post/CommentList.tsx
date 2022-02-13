import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { List, Comment, Avatar, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import './Post.css'
import { createComment, getCommentsByPostId } from '../../actions/comments';
import { RootState } from '../../reducers';


const { TextArea } = Input;
const initialCommentForm = { content: '', post: '' };

const CommentList = (props: CommentProps) => {

    const [commentForm, setCommentForm] = useState(initialCommentForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { user, postId } = props;

    useEffect(() => {
        dispatch(getCommentsByPostId(postId as string));
    }, [dispatch]);

    const comments = useSelector((state: RootState) => state.comments);

    const handleSubmit = () => {
        dispatch(createComment(commentForm, navigate));
        form.resetFields(["content"]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => setCommentForm({ ...commentForm, [e.target.name]: e.target.value, post: postId as string });

    return (
        <div className="comment-container">
            <div className="comment-header">Comments</div>
            <Comment
                avatar={<Avatar icon={<UserOutlined className="comment-avatar" />} />}
                content={
                    <Form form={form}>
                        <Form.Item name="content">
                            <TextArea rows={4} name='content' placeholder={"Reply as" + " " + user.result.firstName + " " + user.result.lastName + "..."} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" className="comment-button" onClick={handleSubmit}>
                                Add Comment
                            </Button>
                        </Form.Item>
                    </Form>
                }
            />
            <List
                style={{ color: "white" }}
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={(item: any) => (
                    <List.Item className='comment-list-item' >
                        <List.Item.Meta
                            title={<div className="comment-list-item-meta"><Avatar icon={<UserOutlined className='comment-avatar' />} /> <span className="comment-ownername"></span> {item.ownerName} <span className='comment-date'>{item.shortDate}</span></div>}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    );
}


export default CommentList;
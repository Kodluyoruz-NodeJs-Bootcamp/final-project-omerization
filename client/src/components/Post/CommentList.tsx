import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, List, Comment, Avatar, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { createComment, getCommentsByPostId } from '../../actions/comments';
import { RootState } from '../../reducers';



const { Content, Footer } = Layout;
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
        <div style={{ padding: 20 }}>
            <div style={{ color: "white", fontWeight: 500, fontSize: "1.4em" }}>Comments</div>

            <Comment
                avatar={<Avatar icon={<UserOutlined style={{ marginBottom: 5 }} />} />}
                content={
                    <Form form={form}>
                        <Form.Item name="content">
                            <TextArea rows={4} name='content' placeholder={"Reply as" + " " + user.result.firstName + " " + user.result.lastName + "..."} onChange={handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" style={{ background: "#18c947", borderColor: "#9ab", fontWeight: 700 }} onClick={handleSubmit}>
                                Add Comment
                            </Button>
                        </Form.Item>
                    </Form>
                }
            />
            <List
                style={{color:"white"}}
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={(item: any) => (
                    <List.Item style={{ paddingLeft: "10%", color: "white", border: "1px  solid #9ab", borderBottom: "none", borderRight: "none",fontWeight:300, borderLeft: "none" }} >
                        <List.Item.Meta
                            title={ <div style={{fontWeight: 500,color:"#cfcfcf" }}><Avatar icon={<UserOutlined style={{ marginBottom: 5 }} />} /> {item.ownerName}     <span style={{fontWeight:300,fontSize:"0.8em"}}>{item.shortDate}</span></div>  }
                        />
                         
                         {item.content}
                    </List.Item>
                )}
            />


        </div>



    );


}


export default CommentList;
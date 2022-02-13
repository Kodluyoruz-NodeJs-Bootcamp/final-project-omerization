import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './Feed.css';
import { Layout, Modal, Button, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as actionType from '../constants/actionTypes';
import decode from 'jwt-decode';
import { PlusOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import ShareNewPost from '../components/Feed/ShareNewPost';
import Posts from '../components/Feed/Posts';

const { Content, Footer } = Layout;

const Feed = () => {

    const [isSharePostVisible, setIsSharePostVisible] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || ''));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();
        dispatch({ type: actionType.LOGOUT });
        navigate('/');
        setUser(null);
    };


    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode<AuthToken>(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile') || ''));
    }, [location]);

    
    const addPostClick = () => {
        setIsSharePostVisible(true);
    }

    const handleCancel = () => {
        setIsSharePostVisible(false);
    }


    return (
        <Layout className="layout feed-layout" >
            <Navbar user={user} logout={logout} />
            <div className="feed-header">Welcome back, <span className="feed-header-user">{user.result.firstName} </span>.  Here's what's going on while you're not here...</div>
            <Content className="feed-content">
                <Divider className="feed-divider" orientation="left"  orientationMargin="10%" plain >
                    Feed
                </Divider>
                <Button type="primary" onClick={addPostClick} icon={<PlusOutlined />} className="post-button">
                    SHARE NEW POST
                </Button>
                <Posts />
                <Modal title="Share New Post" visible={isSharePostVisible} closable={true} onCancel={handleCancel} footer={null} >
                    <ShareNewPost user={user} logout={logout} handleCancel={handleCancel} />
                </Modal>
                <Footer className='feed-footer'></Footer>
            </Content>
        </Layout>

    );


}


export default Feed;
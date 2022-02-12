import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
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
        <Layout className="layout" style={{ minHeight: "100vh", backgroundColor: "#1d1d2b" }}>
            <Navbar user={user} logout={logout} />
            <div style={{margin:"auto",marginTop:20,padding:"0 10%" , color:"white",fontWeight:200, fontSize:"2em"}}>Welcome back, <span style={{fontWeight:400}}>{user.result.firstName} </span>.  Here's what's going on while you're not here...</div>
            <Content style={{ width: "80%", margin: "auto", marginTop: 20, backgroundColor: "#1d1d2b", border: "1px solid #9ab", borderRadius: 5 }}>
               
                <Divider orientation="left" style={{ color: "white", fontSize: "1.8em", fontWeight: 700, }} orientationMargin="10%   " plain >
                    Feed
                </Divider>
                <Button type="primary" onClick={addPostClick} icon={<PlusOutlined />} style={{ background: "#18c947", borderColor: "#9ab", fontWeight: 700, marginLeft: "10%" }}>
                    SHARE NEW POST
                </Button>
                <Posts />
                <Modal title="Share New Post" visible={isSharePostVisible} closable={true} onCancel={handleCancel} footer={null} >
                    <ShareNewPost user={user} logout={logout} handleCancel={handleCancel} />
                </Modal>
                <Footer style={{ backgroundColor: "#1d1d2b" }}></Footer>
            </Content>
        </Layout>

    );


}


export default Feed;
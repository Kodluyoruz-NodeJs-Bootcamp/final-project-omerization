import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Modal, Button, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import bg from '../images/moviesql-background3.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import * as actionType from '../constants/actionTypes';
import decode from 'jwt-decode';

import Navbar from '../components/Navbar';


const { Content, Footer } = Layout;



const Feed = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || ''));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        navigate('/')
    };


    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode<AuthToken>(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile') || ''));
    }, [location]);



    return (
        <Layout className="layout" style={{backgroundImage: `url('${bg}')`, minHeight: "100vh", backgroundColor: "#1d1d2b",backgroundSize: "cover", backgroundRepeat: "no-repeat", overflow: "hidden"  }}>
            <Navbar user={user} logout={logout} />
            <Content style={{ width: "80%", margin: "auto", marginTop: 20, backgroundColor: "transparent", border: "1px solid #9ab", borderRadius: 5 }}>
                <div style={{ margin: "auto", marginTop: 20, padding: "0 10%", color: "white", fontWeight: 600, fontSize: "2em" }}>Getting started with MovieSQL</div>
                <div style={{ margin: "auto", marginTop: 20, padding: "0 10%", color: "white", fontWeight: 200, fontSize: "2em" }}>
                    <div>
                        1. Add your favorites
                    </div>
                    <div>
                        2. Share posts in the feed to make them visible
                    </div>
                    <div>
                        3. Don't forget to like and comment other posts!
                    </div>
                    <a href={"/" + user.result.id + "/favorites"}><Button color='primary' style={{ background: "#18c947", borderColor: "#9ab", fontWeight: 600, marginLeft: 10, color:"white" }}>Go to your favorites</Button></a>

                </div>

                <Footer style={{ backgroundColor: "transparent" }}></Footer>
            </Content>
        </Layout>

    );


}


export default Feed;
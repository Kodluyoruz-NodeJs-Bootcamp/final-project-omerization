import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Modal, Menu, Breadcrumb, Card, Divider, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import * as actionType from '../constants/actionTypes';
import decode from 'jwt-decode';
import FavoriteMovies from '../components/Favorites/FavoriteMovies'
import FavoriteActors from '../components/Favorites/FavoriteActors'
import Navbar from '../components/Navbar'

const { Header, Content, Footer } = Layout;
const { Meta } = Card;





const Favorites = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || ''));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    let { userId } = useParams();


    const logout = () => {
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

    if (user.result.id === userId || user.result.googleId === userId) {
        return (
            <Layout className="layout" style={{ minHeight: "100vh" }}>
                <Navbar user={user} logout={logout} />
                <Content style={{ padding: '0 50px', backgroundColor: "#1d1d2b" }}>
                    <div style={{ margin: "auto", marginTop: 20, padding: "0 35%", color: "white", fontWeight: 200, fontSize: "2em" }}><span style={{ fontWeight: 400 }}>{user.result.firstName} {user.result.givenName}</span> add some favorites to your list</div>

                    <div style={{ display: 'flex', border: "1px solid #9ab", minHeight: 400, borderRadius: 5, marginTop: 20 }}>
                        <FavoriteMovies user={user} />
                        <FavoriteActors user={user} />
                    </div>
                    <Footer style={{ backgroundColor: "#1d1d2b" }}></Footer>
                </Content>
            </Layout>
        );
    } else {
        return (
            <Layout className="layout" style={{ minHeight: "100vh" }}>
                <Navbar user={user} logout={logout} />
                <Content style={{ padding: '0 50px', backgroundColor: "#1d1d2b" }}>
                    <div style={{ margin: "auto", marginTop: 20, padding: "0 35%", color: "white", fontWeight: 200, fontSize: "2em" }}><span style={{ fontWeight: 400 }}>{user.result.firstName} {user.result.givenName}</span> this is not your favorite list. You cant see!</div>
                    <Footer style={{ backgroundColor: "#1d1d2b" }}></Footer>
                </Content>
            </Layout>
        );
    }





}


export default Favorites;
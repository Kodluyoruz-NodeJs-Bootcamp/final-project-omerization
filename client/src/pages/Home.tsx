import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './Home.css'
import { Layout, Button } from 'antd';
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
        <Layout className="layout home-layout" style={{backgroundImage: `url('${bg}')`}}>
            <Navbar user={user} logout={logout} />
            <Content className="home-content">
                <div className="home-content-header">Getting started with MovieSQL</div>
                <div className="home-content-text">
                    <div>
                        1. Add your favorites
                    </div>
                    <div>
                        2. Share posts in the feed to make them visible
                    </div>
                    <div>
                        3. Don't forget to like and comment other posts!
                    </div>
                    <a href={"/" + user.result.id + "/favorites"}><Button color='primary' className="gofavorite-button">Go to your favorites</Button></a>
                </div>
                <Footer className="home-footer" ></Footer>
            </Content>
        </Layout>

    );


}


export default Feed;
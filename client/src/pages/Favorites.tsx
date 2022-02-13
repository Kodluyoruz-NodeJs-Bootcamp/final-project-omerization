import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './Favorites.css'
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import * as actionType from '../constants/actionTypes';
import decode from 'jwt-decode';
import FavoriteMovies from '../components/Favorites/FavoriteMovies'
import FavoriteActors from '../components/Favorites/FavoriteActors'
import Navbar from '../components/Navbar'

const { Content, Footer } = Layout;

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
            <Layout className="layout favorites-layout" >
                <Navbar user={user} logout={logout} />
                <Content className='favorite-content'>
                    <div className="favorites-layout-content-header"><span className="favorite-content-user">{user.result.firstName} {user.result.givenName}</span> add some favorites to your list</div>
                    <div className="favorite-list">
                        <FavoriteMovies user={user} />
                        <FavoriteActors user={user} />
                    </div>
                    <Footer className="favorite-footer"></Footer>
                </Content>
            </Layout>
        );
    } else {
        return (
            <Layout className="layout favorites-layout">
                <Navbar user={user} logout={logout} />
                <Content className='favorite-content' >
                    <div  className="favorites-layout-content-header"><span className="favorite-content-user">{user.result.firstName} {user.result.givenName}</span> this is not your favorite list. You cant see!</div>
                    <Footer className="favorite-footer"></Footer>
                </Content>
            </Layout>
        );
    }
}

export default Favorites;
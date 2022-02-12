import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/memories.png';
import * as actionType from '../constants/actionTypes';
import 'antd/dist/antd.css';
import '../index.css'
import logo from '../images/moviesql.svg';
import { Layout, Menu, Button,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;


const Navbar = (props: UserProps) => {

    const { user, logout } = props;

    const userId = user.result.id ? user.result.id : user.result.googleId;
        
    return (

        <Header style={{ backgroundColor: "#111121" }}>
            <div className="logo"> <a href="/feed"><img src={logo} style={{ height: "50px" }} /></a> </div>
            <Menu style={{marginLeft:"30%",backgroundColor: "#111121"}} theme="dark" mode="horizontal"  selectable={false} defaultSelectedKeys={[""]}>
                <Menu.Item  className='modified-menuItem-userInfo' ><Avatar icon={<UserOutlined style={{marginBottom:5}} />} /> {user?.result.firstName} {user?.result.lastName} {user?.result.givenName} {user?.result.familyName}</Menu.Item>
                <Menu.Item key="1" className='modified-menuItem'><a href="/feed">FEED</a>   </Menu.Item>
                <Menu.Item key="2" className='modified-menuItem'><a href={"/" + userId + "/favorites"} >YOUR FAVORITES</a></Menu.Item>
                <Menu.Item key="3" className='modified-menuItem' onClick={logout}>LOGOUT</Menu.Item>
            </Menu>
        </Header>

    );


}


export default Navbar;
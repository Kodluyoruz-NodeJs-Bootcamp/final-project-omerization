import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Modal, Menu, Breadcrumb } from 'antd';
import logo from '../images/moviesql.svg';
import bg from '../images/moviesql-background2.png';
import '../App.css';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const { Header, Content, Footer } = Layout;



const Landing = (props: LandingProps) => {


    const [isSignInVisible, setIsSignInVisible] = useState(false);
    const [isSignUpVisible, setIsSignUpVisible] = useState(false);



    const { message, loggedIn } = props;

    const signInClick = () => {
        setIsSignInVisible(true);
    };

    const signUpClick = () => {
        setIsSignUpVisible(true);
    };

    const handleCancel = () => {
        setIsSignInVisible(false);
        setIsSignUpVisible(false);
    };




    return (
        <Layout className="layout" style={{ backgroundImage: `url('${bg}')`, height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat", overflow: "hidden" }}>
            <Header style={{ backgroundColor: "transparent", margin: "auto", padding: 10, paddingTop: 0 }}>

                <div style={{ margin: "auto", color: "white", display: "flex" }}>
                    <div style={{ paddingRight: "20px" }}> <a href="/"><img src={logo} style={{ height: "50px", }} /></a> </div>
                    {!loggedIn ?
                        <div style={{ display: "flex" }}>
                            <div style={{ padding: "25px 10px", lineHeight: 1.2, fontWeight: 700, textAlign: "center", color: "#e3e3e3", textShadow: "0px 6px 7px black" }} onClick={signInClick}>SIGN IN</div>
                            <div style={{ padding: "25px 10px", lineHeight: 1.2, fontWeight: 700, textAlign: "center", color: "#e3e3e3", textShadow: "0px 6px 7px black" }} onClick={signUpClick}> CREATE NEW ACCOUNT</div>
                        </div>
                        : null
                    }
                </div>

                <div style={{ color: "white", fontWeight: 600, textAlign: "center" }}>{message}</div>

            </Header>
            <Content style={{ paddingTop: 200, paddingLeft: 20, margin: 'auto' }}>
                <div className="site-layout-content" style={{ textAlign: "center" }} >
                    <h1 style={{ color: "white", fontSize: "3em", fontFamily: "Roboto', sans-serif", fontWeight: 600, textShadow: "0px 6px 7px black" }}>Social movie database</h1>
                    <h2 style={{ color: "white", fontSize: "1.6em", fontFamily: "Roboto', sans-serif", fontWeight: 300, textShadow: "0px 6px 7px black" }}>Join between cinema lovers and begin discovering movies from favorite lists</h2>
                </div>

                <div style={{ color: "gray", textAlign: "center", paddingTop: 300, fontSize: "1.2em" }}>Omer Aslan ©2022</div>
            </Content>
            <Modal title="Basic Modal" visible={isSignInVisible} closable={true} onCancel={handleCancel} footer={null} >
                <SignIn />
            </Modal>
            <Modal title="Basic Modal" visible={isSignUpVisible} closable={true} onCancel={handleCancel} footer={null} >
                <SignUp />
            </Modal>
        </Layout>




    );


}


export default Landing;
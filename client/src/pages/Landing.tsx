import { useState } from 'react';
import 'antd/dist/antd.css';
import './Landing.css'
import { Layout, Modal } from 'antd';
import logo from '../images/moviesql.svg';
import bg from '../images/moviesql-background2.png';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const { Header, Content } = Layout;

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
        <Layout className="layout landing-layout" style={{ backgroundImage: `url('${bg}')`, height: "100vh" }}>
            <Header className='landing-header'>
                <div className='landing-header-content'>
                    <div className="landing-header-logo-container"> <a href="/"><img src={logo} className="landing-header-logo" /></a> </div>
                    {!loggedIn ?
                        <div className="landing-header-item-container">
                            <div className="landing-header-item" onClick={signInClick}>SIGN IN</div>
                            <div className="landing-header-item" onClick={signUpClick}> CREATE NEW ACCOUNT</div>
                        </div>
                        : 
                        <div className="landing-header-item-container">
                            <div className="landing-header-item" ><a href="/feed" className="guest-item">FEED</a> </div>
                        </div>
                    }
                </div>
                <div className="landing-message"> {message}</div>
            </Header>
            <Content className="landing-content">
                <div className="landing-content-header">
                    <h1>Social movie database</h1>
                    <h2>Join between cinema lovers and begin discovering movies from favorite lists</h2>
                </div>
                <div className="landing-brand">Omer Aslan ©2022</div>
            </Content>
            <Modal title="Sign In" visible={isSignInVisible} closable={true} onCancel={handleCancel} footer={null} >
                <SignIn />
            </Modal>
            <Modal title="Sign Up" visible={isSignUpVisible} closable={true} onCancel={handleCancel} footer={null} >
                <SignUp />
            </Modal>
        </Layout>




    );


}


export default Landing;
import 'antd/dist/antd.css';
import './404.css'
import { Layout } from 'antd';
import logo from '../images/moviesql.svg';
import bg from '../images/moviesql-background4.jpg';

const { Header, Content, Footer } = Layout;

const Error_404 = () => {

    return (
        <Layout className="background-layout layout" style={{ backgroundImage: `url('${bg}')`, height: "100vh" }}>
            <Header className="error-header">
                <div className="error-header-content">
                    <div className="error-header-logo-content"> <a href="/"><img src={logo} className="error-header-logo" /></a> </div>
                    <div className="error-header-item-container">
                        <div className="error-header-item" ><a href="/"> RETURN TO FEED</a>  </div>
                    </div>
                </div>
            </Header>
            <Content className="error-content">
                <div className="site-layout-content error-content-text"  >
                    <h1>404</h1>
                    <h2>Nothing here.. For even the very wise cannot see all ends.</h2>
                </div>
                <div className="error-footer" >Omer Aslan ©2022</div>
            </Content>
        </Layout>
    );
}

export default Error_404;
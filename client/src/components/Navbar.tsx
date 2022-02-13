import 'antd/dist/antd.css';
import './Navbar.css'
import logo from '../images/moviesql.svg';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = (props: UserProps) => {

    const { user, logout } = props;
    const userId = user.result.id ? user.result.id : user.result.googleId;
        
    return (
        <Header className="navbar-header">
            <div className="logo"> <a href="/feed"><img src={logo} className="navbar-logo" /></a> </div>
            <Menu className="modifed-menu" theme="dark" mode="horizontal"  selectable={false} defaultSelectedKeys={[""]}>
                <Menu.Item  className='modified-menuItem-userInfo' ><Avatar icon={<UserOutlined className="navbar-avatar" />} /> {user?.result.firstName} {user?.result.lastName} {user?.result.givenName} {user?.result.familyName}</Menu.Item>
                <Menu.Item key="1" className='modified-menuItem'><a href="/feed">FEED</a>   </Menu.Item>
                <Menu.Item key="2" className='modified-menuItem'><a href={"/" + userId + "/favorites"} >YOUR FAVORITES</a></Menu.Item>
                <Menu.Item key="3" className='modified-menuItem' onClick={logout}>LOGOUT</Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;
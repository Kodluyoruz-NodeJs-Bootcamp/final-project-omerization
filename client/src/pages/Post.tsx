import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './Post.css';
import { Layout, Modal, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getPostById, deletePost, likePost } from '../actions/posts';
import { getFavoriteById } from '../actions/favorites';
import * as actionType from '../constants/actionTypes';
import decode from 'jwt-decode';
import Navbar from '../components/Navbar';
import PostCard from '../components/Post/PostCard';
import CommentList from '../components/Post/CommentList';
import UpdatePost from '../components/Post/UpdatePost';
import { RootState } from '../reducers';
import { HeartOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;

const Post = () => {

    const [isUpdatePostVisible, setIsUpdatePostVisible] = useState(false);
    const [postToUpdate, setPostToUpdate] = useState({});
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile') || ''));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    let { postId } = useParams();

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

    useEffect(() => {
        dispatch(getPostById(postId as string));
    }, [dispatch]);

    const post = useSelector((state: RootState) => state.allPosts);

    useEffect(() => {
        dispatch(getFavoriteById(post.favoriteId));
    }, [post, dispatch]);

    const favorite = useSelector((state: RootState) => state.favorites);

    const handleCancel = () => {
        setIsUpdatePostVisible(false);
    };

    const handleUpdate = (post: object) => {
        setIsUpdatePostVisible(true);
        setPostToUpdate(post);
    }

    const handleLike = (post: any) => {
        dispatch(likePost(post.id as string));
        window.location.reload();
    }

    const handleDelete = (post: any) => {
        dispatch(deletePost(post.id as string, navigate));
        window.location.replace("/feed");
    }

    return (
        <Layout className="layout post-layout" >
            <Navbar user={user} logout={logout} />
            <Content className="post-content">
                <Row gutter={16} >
                    <Col xs={24} sm={24} md={8} lg={8} xl={4} >
                        <PostCard name={favorite.name} image={favorite.image} />
                        {user.result.id == post.owner ?
                            <div className="post-options"> <span className="post-options-item" onClick={() => { handleUpdate(post) }}>Update</span> <span className="post-options-item" onClick={() => { handleDelete(post) }}>Delete</span>  </div> :
                            <div className="likes-container"> <HeartOutlined onClick={() => { handleLike(post) }} className="likes-icon" /> <div>Like Post</div> <div className="likes-count">{post.likeCount} Likes</div> </div>}
                    </Col>
                    <Col xs={24} sm={24} md={14} lg={14} xl={18}  >
                        <div className="post-info-ownername">
                            {post.ownerName}'s post
                        </div>
                        <div className="post-info-favoritename"> {post.favorite} </div>
                        <div className="post-info-date"> {post.shortDate}</div>
                        <div className="post-info-review">{post.review}</div>
                    </Col>
                </Row>
                <CommentList user={user} postId={postId} />
                <Modal title="Update The Post" visible={isUpdatePostVisible} closable={true} onCancel={handleCancel} footer={null} >
                    <UpdatePost postToUpdate={postToUpdate} favorite={favorite} handleCancel={handleCancel} />
                </Modal>

                <Footer className="post-footer"></Footer>
            </Content>
        </Layout>

    );


}


export default Post;
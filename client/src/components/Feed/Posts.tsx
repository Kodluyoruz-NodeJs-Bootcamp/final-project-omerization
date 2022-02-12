import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { getAllPosts } from '../../actions/posts';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import InfiniteScroll from 'react-infinite-scroll-component';

const Posts = () => {
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();




    const postList = useSelector((state: RootState) => state.allPosts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [postList, dispatch]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        setPostData(postList);
        setLoading(false);
    };

    useEffect(() => {
        loadMoreData();
    }, []);



    return (
        <div
            id="scrollableDiv"
            style={{

                overflow: 'auto',
                marginTop: 30,
            }}
        >
            <InfiniteScroll
                dataLength={postList.length}
                next={loadMoreData}
                hasMore={postList.length < 2}
                loader={<h4>Loading...</h4>}
                endMessage={<Divider style={{ color: "white" }} plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="body"
            >
                <List
                    dataSource={postList}
                    renderItem={(item: any) => (
                        <List.Item style={{ paddingLeft: "10%", color: "white", border: "1px  solid #9ab", borderBottom: "none", borderRight: "none", borderLeft: "none" }} >
                            <List.Item.Meta
                                title={<a href={'/posts/' + item.id}><div style={{fontWeight: 200,color:"#cfcfcf" }}> <span style={{ color: "white",fontWeight:500 }}>{item.ownerName} </span> added a new post about <span style={{ color: "white",fontWeight:500  }}>{item.favorite}</span> </div></a>     }
                            />
                            <div style={{marginRight:10, fontSize:"0.8em"}}>{item.shortDate}</div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};


export default Posts;
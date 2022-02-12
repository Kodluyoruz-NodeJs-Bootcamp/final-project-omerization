import React, { useEffect, useState } from 'react';
import { Layout, Modal, Menu, Breadcrumb, Card, Divider, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddFavoriteMovie from './AddFavoriteMovie'
import UpdateFavorite from './UpdateFavorite'
import FavoriteCard from './FavoriteCard'
import { getUserFavoriteMovies,deleteFavorite } from '../../actions/favorites';
import { RootState } from '../../reducers';
import { useParams } from "react-router-dom";




const FavoriteMovies = (props: OnlyUserProps) => {

    const [isAddMovieVisible, setIsAddMovieVisible] = useState(false);
    const [isUpdateMovieVisible, setIsUpdateMovieVisible] = useState(false);  
    const [favoriteToUpdate, setFavoriteToUpdate] = useState({});

    const dispatch = useDispatch();
    const { userId } = useParams();

    const { user } = props;

   

    useEffect(() => {
        dispatch(getUserFavoriteMovies(userId as string));
    }, [ dispatch]);

    const favoriteMovies = useSelector((state: RootState) => state.favoriteMovies);


    const addMovieClick = () => {
        setIsAddMovieVisible(true);
    };


    const handleCancel = () => {
        setIsAddMovieVisible(false);
        setIsUpdateMovieVisible(false);
    };

    const handleUpdate = (favorite: object) => {
        setIsUpdateMovieVisible(true);
        setFavoriteToUpdate(favorite);
      
    }

    const handleDelete = (favorite: any) => {
        dispatch(deleteFavorite(favorite.id as string));
        window.location.reload();
    }



    return (

        <div style={{ width: "50%", border: "1px solid #9ab", borderRadius: 5, }}>
            <Divider orientation="left" style={{ color: "#9ab", fontSize: "1.5em" }} orientationMargin="10px" plain >
                Favorite Movies
            </Divider>
            <Button type="primary" onClick={addMovieClick} icon={<PlusOutlined />} style={{ background: "#18c947", borderColor: "#9ab", fontWeight: 700, marginLeft: 10 }}>
                ADD NEW
            </Button>
            <Row gutter={24}>
                {favoriteMovies.map((favorite: FavoriteProps) => (
                    <FavoriteCard name={favorite.name} image={favorite.image} owner={favorite.owner} userId={user.result.id} favorite={favorite} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                ))};

                <Modal title="Add New Favorite Movie" visible={isAddMovieVisible} closable={true} onCancel={handleCancel} footer={null} >
                    <AddFavoriteMovie handleCancel={handleCancel} />
                </Modal>
                <Modal title="Update Favorite Movie" visible={isUpdateMovieVisible} closable={true} onCancel={handleCancel} footer={null} >
                    <UpdateFavorite handleCancel={handleCancel} favoriteToUpdate={favoriteToUpdate} />
                </Modal>
            </Row>
        </div>

    );




}


export default FavoriteMovies;
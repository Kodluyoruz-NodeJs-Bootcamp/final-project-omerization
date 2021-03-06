import { useEffect, useState } from 'react';
import { Modal, Divider, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddFavoriteActor from './AddFavoriteActor';
import UpdateFavorite from './UpdateFavorite';
import FavoriteCard from './FavoriteCard';
import './Favorites.css';
import { getUserFavoriteActors, deleteFavorite } from '../../actions/favorites';
import { RootState } from '../../reducers';
import { useParams } from "react-router-dom";

const FavoriteActors = (props: OnlyUserProps) => {

    const [isAddActorVisible, setIsAddActorVisible] = useState(false);
    const [isUpdateActorVisible, setIsUpdateActorVisible] = useState(false);
    const [favoriteToUpdate, setFavoriteToUpdate] = useState({});

    const dispatch = useDispatch();
    let { userId } = useParams();

    const { user } = props;

    useEffect(() => {
        dispatch(getUserFavoriteActors(userId as string));
    }, [dispatch]);

    const favoriteActors = useSelector((state: RootState) => state.favoriteActors);

    const addActorClick = () => {
        setIsAddActorVisible(true);
    };

    const handleCancel = () => {
        setIsAddActorVisible(false);
        setIsUpdateActorVisible(false);
    };

    const handleUpdate = (favorite: object) => {
        setIsUpdateActorVisible(true);
        setFavoriteToUpdate(favorite);
    }

    const handleDelete = (favorite: any) => {
        dispatch(deleteFavorite(favorite.id as string));
        window.location.reload();
    }

    return (
        <div className="favorite-container">
            <Divider orientation="left" className="favorite-divider" orientationMargin="10px" plain >
                Favorite Actors
            </Divider>
            <Button type="primary" onClick={addActorClick} icon={<PlusOutlined />} className="addnew-button" >
                ADD NEW
            </Button>
            <Row gutter={24}>
                {favoriteActors.map((favorite: FavoriteProps) => (
                    <FavoriteCard name={favorite.name} image={favorite.image} owner={favorite.owner} userId={user.result.id} favorite={favorite} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                ))};
                <Modal title="Add New Favorite Actor" visible={isAddActorVisible} closable={true} onCancel={handleCancel} footer={null} >
                    <AddFavoriteActor handleCancel={handleCancel} />
                </Modal>
                <Modal title="Update Favorite Actor" visible={isUpdateActorVisible}  closable={true} onCancel={handleCancel} footer={null} >
                    <UpdateFavorite handleCancel={handleCancel} favoriteToUpdate={favoriteToUpdate} />
                </Modal>
            </Row>
        </div>
    );
}


export default FavoriteActors;
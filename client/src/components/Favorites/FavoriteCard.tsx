import { Col } from 'antd';
import './Favorites.css';

const FavoriteCard = (props: FavoriteProps) => {

    const { name, image, userId, owner, favorite, handleUpdate, handleDelete } = props;
    const backgroundImage = image ? `url(${image})` : ''

    return (
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div className="favoritecard-container">
                <div style={{ backgroundImage: backgroundImage }} className="favoritecard-image" />        
                <div className="favoritecard-name">
                    {name}
                </div>
            </div>
            <div className="favoritecard-options" >
                {userId == owner ? <div><span className="favoritecard-options-item" onClick={()=> {handleUpdate(favorite)} }  >Update</span> <span className="favoritecard-options-item" onClick={()=> {handleDelete(favorite)}} >Delete</span> </div> : null}
            </div>
        </Col>
    );
}


export default FavoriteCard;
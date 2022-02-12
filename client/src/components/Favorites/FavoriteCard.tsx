
import { Col } from 'antd';



const FavoriteCard = (props: FavoriteProps) => {

    const { name, image, userId, owner, favorite, handleUpdate, handleDelete } = props;
    const backgroundImage = image ? `url(${image})` : ''

    return (
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div style={{ height: 320, width: 160, border: "1px solid #9ab", borderRadius: 5, backgroundColor: "#456", margin: 10 }}>
                <div style={{ height: "80%", backgroundImage: backgroundImage, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

                </div>
                <div style={{ color: "#a2c4e8", fontWeight: 700, textAlign: "center", overflowWrap: "break-word", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {name}
                </div>
            </div>
            <div style={{ margin: 10,marginLeft:40, color:"#9ab", fontWeight:600}}>
                {userId == owner ? <div><span onClick={()=> {handleUpdate(favorite)} }  >Update</span> <span onClick={()=> {handleDelete(favorite)}} >Delete</span> </div> : null}
            </div>
        

        </Col>

    );




}


export default FavoriteCard;

import {  Col } from 'antd';

const PostCard = (props:PostCardProps) => {

    const { image } = props; 
    const backgroundImage = image ? `url(${image})` : ''

    return (
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div style={{ height: 260, width: 160, border: "1px solid #9ab", borderRadius: 5, backgroundColor: "#456", margin: 10 }}>
                <div style={{ backgroundImage: backgroundImage , height: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition:"center" }} />
            </div>
        </Col>
    );
}

export default PostCard;
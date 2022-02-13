import 'antd/dist/antd.css';
import UpdateMovieForm from "./UpdateMovieForm";
import UpdateActorForm from "./UpdateActorForm";

const UpdatePost = (props: UpdatePostProps) => {

    const { postToUpdate, favorite, handleCancel } = props;

    return (
        <div>
            <div>   
                {favorite.type == "movie" ? 
                <UpdateMovieForm postToUpdate={postToUpdate} favorite={favorite} handleCancel={handleCancel}/> :
                <UpdateActorForm postToUpdate={postToUpdate} favorite={favorite} handleCancel={handleCancel}/> }
            </div>
        </div>
    );
};

export default UpdatePost;
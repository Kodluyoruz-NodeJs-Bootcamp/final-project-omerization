import React, { useEffect, useState } from 'react';
import {  Button } from 'antd';
import 'antd/dist/antd.css';
import UpdateMovieForm from "./UpdateMovieForm";
import UpdateActorForm from "./UpdateActorForm";




const UpdatePost = (props: UpdatePostProps) => {


    const { postToUpdate, favorite, handleCancel } = props;
    const initialState = { name: postToUpdate.review , image:postToUpdate.image };
    const [isMovieFormVisible, setIsMovieFormVisible] = useState(false);
    const [isActorFormVisible, setIsActorFormVisible] = useState(false);



    const movieClick = () => {
        setIsActorFormVisible(false);
        setIsMovieFormVisible(true);
    };

    const actorClick = () => {
        setIsMovieFormVisible(false);
        setIsActorFormVisible(true);
    };

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
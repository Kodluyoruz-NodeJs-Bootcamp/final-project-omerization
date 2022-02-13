import React, { useEffect, useState } from 'react';
import {  Button } from 'antd';
import 'antd/dist/antd.css';
import ActorForm from "./ActorForm";
import MovieForm from "./MovieForm";




const ShareNewPost = (props: SharePostProps) => {

    const [isMovieFormVisible, setIsMovieFormVisible] = useState(false);
    const [isActorFormVisible, setIsActorFormVisible] = useState(false);


    const {user, handleCancel } = props;
  

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
            <div>Which one do you want to post about today? </div>
            <div>
                <Button onClick={movieClick}>A Movie</Button>
                <Button onClick={actorClick}>An Actor</Button>
                <ActorForm user={user} isActorFormVisible={isActorFormVisible}  handleCancel={handleCancel} />
                <MovieForm user={user} isMovieFormVisible={isMovieFormVisible}  handleCancel={handleCancel} />
            </div>
        </div>
    );
};

export default ShareNewPost;
import express from 'express';
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";
import { Favorite } from "../entity/Favorite";


const router = express.Router();


interface IGetUserAuthInfoRequest extends Request {
    user?: String;
    userName?: String;
}


export const createPost = async (req: IGetUserAuthInfoRequest, res: Response) => {

    const postRepository = getRepository(Post);
    const favoriteRepository = getRepository(Favorite);
    const info = req.body;
    const shortDate = new Date().toLocaleDateString();
    const favorite = await favoriteRepository.findOne({name:info.favorite});
    const favoriteId = favorite?.id;
    const newPost = { ...info,shortDate, owner: req.user, ownerName: req.userName, favoriteId }

    try {
        const result = await postRepository.save(newPost);
        res.status(200).json(result);
    } catch (error: any) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


export const updatePost = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { postId } = req.params;
    const postRepository = getRepository(Post);
    const favoriteRepository = getRepository(Favorite);
    const {favorite, review} = req.body;
    
    
    const favoriteData = await favoriteRepository.findOne({name:favorite});
    const favoriteId = favoriteData?.id;
 
    const postToUpdate = await postRepository.findOne({id:postId});


    if(!postToUpdate) return res.status(404).send(`No post with id: ${postId}`);

    postToUpdate.favorite  = favorite;
    postToUpdate.favoriteId  = favoriteId as string;
    postToUpdate.review = review;
    try {
        const result = await postRepository.save(postToUpdate);
     
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const likePost = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { postId } = req.params;
    const postRepository = getRepository(Post);
    
    const postToUpdate = await postRepository.findOne({id:postId});

    if(!postToUpdate) return res.status(404).send(`No post with id: ${postId}`);

    postToUpdate.likeCount++;

    try {
        const result = await postRepository.save(postToUpdate);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}


export const deletePost = async (req: IGetUserAuthInfoRequest, res: Response) => {

    const { postId } = req.params;

    const postRepository = getRepository(Post);
    const postToRemove = await postRepository.findOne({id:postId});
 
    try {
        await postRepository.remove(postToRemove as Post);
        res.status(200).json({ message: "Post deleted successfully." });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}


export const getAllPosts = async (req: Request, res: Response) => { 

    const postRepository = getRepository(Post);

    try {
        const posts = await postRepository.find( {order: {"createdAt": 'DESC'}}  );
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostById = async (req: Request, res: Response) => { 

    const { postId } = req.params;
    const postRepository = getRepository(Post);

    try {
        const post = await postRepository.findOne({id:postId});
        res.status(200).json(post);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}
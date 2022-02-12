import express from 'express';
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";



const router = express.Router();


interface IGetUserAuthInfoRequest extends Request {
    user?: String;
    userName?: String;
}


export const createComment = async (req: IGetUserAuthInfoRequest, res: Response) => {

    const commentRepository = getRepository(Comment);
    const info = req.body;
    const shortDate = new Date().toLocaleDateString();

    const newComment = { ...info, shortDate, owner: req.user, ownerName: req.userName  }

    try {
        const result = await commentRepository.save(newComment);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}


export const getCommentsByPostId = async (req: Request, res: Response) => { 

    const { postId } = req.params;
    const commentRepository = getRepository(Comment);

    try {
        const comments = await commentRepository.find({order: {"createdAt": 'ASC'},where:{post:postId}});
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}


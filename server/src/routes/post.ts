import express from "express";

import { createPost,updatePost, deletePost, likePost, getAllPosts, getPostById } from '../controllers/post';

const router = express.Router();

import auth from "../middleware/auth";
import isPostOwner from "../middleware/isPostOwner";

router.post('/', auth, createPost)
router.patch('/:postId', auth, isPostOwner, updatePost);
router.patch('/:postId/likes', auth, likePost);
router.delete('/:postId', auth, isPostOwner, deletePost);
router.get('/', getAllPosts)
router.get('/:postId', getPostById)


export default router;
import express from "express";

import { createComment, getCommentsByPostId } from '../controllers/comment';

const router = express.Router();

import auth from "../middleware/auth";

router.post('/', auth, createComment)
router.get('/:postId', auth, getCommentsByPostId)

export default router;
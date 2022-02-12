import express from "express";

import { createFavorite, updateFavorite, deleteFavorite, getUserFavoriteMovies, getUserFavoriteActors, getFavoriteById } from '../controllers/favorite';

const router = express.Router();

import auth from "../middleware/auth";
import isFavoriteOwner from "../middleware/isFavoriteOwner";

router.post('/', auth, createFavorite);
router.patch('/:favoriteId', auth, isFavoriteOwner, updateFavorite);
router.get('/:favoriteId', auth, getFavoriteById);
router.delete('/:favoriteId', auth, isFavoriteOwner, deleteFavorite);
router.get('/movies/:userId', auth, getUserFavoriteMovies);
router.get('/actors/:userId', auth, getUserFavoriteActors);


export default router;
import { combineReducers } from 'redux';


import auth from './auth';
import favorites from './favorites';
import allPosts from './posts';
import comments from './comments';
import favoriteMovies from './favoriteMovies';
import favoriteActors from './favoriteActors';

export const reducers = combineReducers({  auth, favorites, comments, favoriteMovies, favoriteActors, allPosts });

export type RootState = ReturnType<typeof reducers>
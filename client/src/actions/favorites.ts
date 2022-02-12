import { CREATE_FAVORITE, UPDATE_FAVORITE, DELETE_FAVORITE, GET_USER_MOVIES, GET_USER_ACTORS, GET_FAVORITE_BY_ID } from '../constants/actionTypes';
import * as api from '../api/index';




export const createFavorite = (formData: Object, router: Function) => async (dispatch: Function) => {
  try {

    const { data } = await api.createFavorite(formData);


    dispatch({ type: CREATE_FAVORITE, data });


  } catch (error) {
    console.log(error);
  }
};

export const updateFavorite = (formData: Object, favoriteId: String) => async (dispatch: Function) => {
  try {
    const { data } = await api.updateFavorite(formData, favoriteId);

    await dispatch({ type: UPDATE_FAVORITE, data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorite = (favoriteId: String) => async (dispatch: Function) => {
  try {
    await api.deleteFavorite(favoriteId);

    await dispatch({ type: DELETE_FAVORITE, data: favoriteId });
  } catch (error) {
    console.log(error);
  }
};

export const getUserFavoriteMovies = (userId: String) => async (dispatch: Function) => {
  try {
    const { data } = await api.getUserFavoriteMovies(userId);

    dispatch({ type: GET_USER_MOVIES, data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserFavoriteActors = (userId: String) => async (dispatch: Function) => {
  try {
    const { data } = await api.getUserFavoriteActors(userId);

    dispatch({ type: GET_USER_ACTORS, data });
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteById = (favoriteId: String) => async (dispatch: Function) => {
  try {

    const { data } = await api.getFavoriteById(favoriteId);

    dispatch({ type: GET_FAVORITE_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};








import { FETCH_ALL, CREATE_FAVORITE, UPDATE_FAVORITE, DELETE_FAVORITE, LIKE, GET_FAVORITE_BY_ID } from '../constants/actionTypes';

export default (favorites = [], action: actionFavorites) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.data;
    case GET_FAVORITE_BY_ID:
      return action.data;
    case UPDATE_FAVORITE:
      return favorites.map((favorite: any) => (favorite.id === action.data.id ? action.data : favorite));
    case DELETE_FAVORITE:
      return favorites.filter((favorite: any) => favorite.id !== action.data);
    case CREATE_FAVORITE:
      return [...favorites, action.data];
    default:
      return favorites;
  }
};
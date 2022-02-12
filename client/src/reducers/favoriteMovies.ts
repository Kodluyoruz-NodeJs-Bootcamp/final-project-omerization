import { GET_USER_MOVIES } from '../constants/actionTypes';

export default (favoriteMovies = [], action:actionFavorites) => {
  switch (action.type) {
    case GET_USER_MOVIES:
      return action.data;
    default:
      return favoriteMovies;
  }
};
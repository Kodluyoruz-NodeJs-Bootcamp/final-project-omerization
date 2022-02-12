import { GET_USER_ACTORS } from '../constants/actionTypes';

export default (favoriteActors = [], action:actionFavorites) => {
  switch (action.type) {
    case GET_USER_ACTORS:
      return action.data;
    default:
      return favoriteActors;
  }
};
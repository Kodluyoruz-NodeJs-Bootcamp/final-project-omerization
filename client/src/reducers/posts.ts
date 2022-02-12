import { FETCH_ALL_POSTS, CREATE_POST, LIKE_POST, DELETE_POST, UPDATE_POST, GET_POST_BY_ID } from '../constants/actionTypes';

export default (allPosts = [], action: actionPosts) => {
  switch (action.type) {
    case FETCH_ALL_POSTS:
      return action.data;
    case GET_POST_BY_ID:
      return action.data;
    case CREATE_POST:
      return [...allPosts, action.data];
    case UPDATE_POST:
      return action.data;
    case LIKE_POST:
      return [...allPosts, action.data];
    case DELETE_POST:
      return action.data;
    default:
      return allPosts;
  }
};
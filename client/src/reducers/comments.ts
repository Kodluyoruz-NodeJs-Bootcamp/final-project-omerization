import { CREATE_COMMENT, GET_COMMENTS_BY_POSTID } from '../constants/actionTypes';

export default (comments = [], action: actionComments) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POSTID:
      return action.data;
    case CREATE_COMMENT:
      return [...comments, action.data];
    default:
      return comments;
  }
};
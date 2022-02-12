import { CREATE_COMMENT, GET_COMMENTS_BY_POSTID } from '../constants/actionTypes';
import * as api from '../api/index';



export const createComment = (formData: Object, router: Function) => async (dispatch: Function) => {
  try {

    const { data } = await api.createComment(formData);

    dispatch({ type: CREATE_COMMENT, data });

  } catch (error) {
    console.log(error);
  }
};

export const getCommentsByPostId = (postId: String) => async (dispatch: Function) => {
  try {

    const { data } = await api.getCommentsByPostId(postId);
   
    dispatch({ type: GET_COMMENTS_BY_POSTID, data });
  } catch (error) {
    console.log(error);
  }
};



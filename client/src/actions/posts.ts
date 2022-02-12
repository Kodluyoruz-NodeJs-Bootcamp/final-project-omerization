import { CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, FETCH_ALL_POSTS, GET_POST_BY_ID} from '../constants/actionTypes';
import * as api from '../api/index';



export const createPost = (formData: Object, router: Function) => async (dispatch: Function) => {
  try {
    const { data } = await api.createPost(formData);
    dispatch({ type: CREATE_POST, data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (formData: Object, postId: String) => async (dispatch: Function) => {
  try {
    const { data } = await api.updatePost(formData, postId);
    dispatch({ type: UPDATE_POST, data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (postId: String, router: Function) => async (dispatch: Function) => {
  try {
    const { data } = await api.deletePost(postId);

    dispatch({ type: DELETE_POST, data });

  } catch (error) {
    console.log(error);
  }
};

export const likePost = (postId: String) => async (dispatch: Function) => {
  try {
    const { data } = await api.likePost(postId);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getAllPosts = () => async (dispatch: Function) => {
  try {
    const { data } = await api.getAllPosts();
   
    dispatch({ type: FETCH_ALL_POSTS, data });
  } catch (error) {
    console.log(error);
  }
};


export const getPostById = (postId: String) => async (dispatch: Function) => {
  try {
    const { data } = await api.getPostById(postId);
    dispatch({ type: GET_POST_BY_ID, data });
  } catch (error) {
    console.log(error);
  }
};



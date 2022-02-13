import axios from 'axios';

const API = axios.create({ baseURL: '/' });



API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    if(req.headers){
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile') || '').token}`;
    }
  } 
  return req;
});



export const createFavorite = (formData:Object) => API.post('/favorites', formData);
export const updateFavorite = (formData:Object, favoriteId:String) => API.patch(`/favorites/${favoriteId}`,formData);
export const deleteFavorite = ( favoriteId:String) => API.delete(`/favorites/${favoriteId}`);
export const getFavoriteById = (favoriteId:String) => API.get(`/favorites/${favoriteId}`);
export const getUserFavoriteMovies = (userId:String) => API.get(`/favorites/movies/${userId}`);
export const getUserFavoriteActors = (userId:String) => API.get(`/favorites/actors/${userId}`);



export const createPost = (formData:Object) => API.post('/posts', formData);
export const updatePost = (formData:Object, postId:String) => API.patch(`/posts/${postId}`,formData);
export const deletePost = (postId:String) => API.delete(`/posts/${postId}`);
export const likePost = (postId:String) => API.patch(`/posts/${postId}/likes`);
export const getAllPosts = () => API.get('/posts');
export const getPostById = (postId:String) => API.get(`/posts/${postId}`);

export const createComment = (formData:Object) => API.post('/comments', formData);
export const getCommentsByPostId = (postId:String) => API.get(`/comments/${postId}`);


export const signIn = (formData:Object) => API.post('/user/signin', formData);
export const signUp = (formData:Object) => API.post('/user/signup', formData);
export const googleSignup = (formData:Object) => API.post('/user/signin/google', formData);
export const facebookSignup = (formData:Object) => API.post('/user/signin/facebook', formData);




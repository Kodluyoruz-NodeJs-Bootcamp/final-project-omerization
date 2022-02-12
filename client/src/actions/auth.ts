import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData:Object, router:Function) => async (dispatch:Function) => {
  try {
   
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router('/home');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData:Object, router:Function) => async (dispatch:Function) => {
  try {

    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/home');
  } catch (error) {
    console.log(error);
  }
};

export const googleSignup = (formData:Object, router:Function) => async (dispatch:Function) => {
  try {

    const { data } = await api.googleSignup(formData);

    dispatch({ type: AUTH, data });
    router('/home');
  } catch (error) {
    console.log(error);
  }
};


export const facebookSignup = (formData:Object, router:Function) => async (dispatch:Function) => {
  try {

    const { data } = await api.facebookSignup(formData);

    dispatch({ type: AUTH, data });
    router('/home');
  } catch (error) {
    console.log(error);
  }
};
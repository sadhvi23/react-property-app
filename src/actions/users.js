import {
    USER_LOGIN, USER_SIGNUP
} from "./types";

import { userService } from "../services/userService";

// User login service
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await userService.login({ email, password });

    dispatch({
      type: USER_LOGIN,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// User Signup service
export const signUp = (email, name, password) => async (dispatch) => {
  try {
    const res = await userService.signUp({ email, name, password });

    dispatch({
      type: USER_SIGNUP,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

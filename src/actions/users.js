import {
    USER_LOGIN, USER_SIGNUP, ADD_USER, LIST_USER, DEACTIVATE_USER, UPDATE_USER, DELETE_USER, SHOW_USER
} from "./types";

import { userService } from "../services/userService";

// User login service
export const login = (email, password, _) => async (dispatch) => {
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
export const signUp = (email, password, name) => async (dispatch) => {
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

// Add User service
export const addUser = (email, password, name, role) => async (dispatch) => {
  try {
    const res = await userService.addUser({ email, name, password, role });

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// List User service
export const listUser = () => async (dispatch) => {
  try {
    const res = await userService.listUser();

    dispatch({
      type: LIST_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Deactivate User service
export const deactivateUser = (id) => async (dispatch) => {
  try {
    const res = await userService.deactivateUser({id});

    dispatch({
      type: DEACTIVATE_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Update User service
export const updateUser = (id, email, name, role ) => async (dispatch) => {
  try {
    const res = await userService.updateUser({id, email, name, role});

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Delete User service
export const deleteUser = ( id ) => async (dispatch) => {
  try {
    const res = await userService.deleteUser({id});

    dispatch({
      type: DELETE_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Show User service
export const showUser = (id) => async (dispatch) => {
  try {
    const res = await userService.showUser({id});

    dispatch({
      type: SHOW_USER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

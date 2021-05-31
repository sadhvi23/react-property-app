import {
    ADD_PROPERTY, LIST_PROPERTY, DEACTIVATE_PROPERTY, UPDATE_PROPERTY, DELETE_PROPERTY, BUY_PROPERTY, 
    ADD_OWNER, MY_PROPERTIES
} from "./types";

import { propertyService } from "../services/propertyService";

// Property Create service
export const addProperty = (name, is_approved, is_available) => async (dispatch) => {
  try {
    const res = await propertyService.addProperty({ name, is_approved, is_available });

    dispatch({
      type: ADD_PROPERTY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Property List service
export const listProperty = () => async (dispatch) => {
  try {
    const res = await propertyService.listProperty();

    dispatch({
      type: LIST_PROPERTY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Deactivate Property service
export const deactivateProperty = (id) => async (dispatch) => {
  try {
    const res = await propertyService.deactivateProperty({id});

    dispatch({
      type: DEACTIVATE_PROPERTY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Update Property service
export const updateProperty = (id, name, is_available, is_approved ) => async (dispatch) => {
  try {
    const res = await propertyService.updateProperty({id, name, is_available, is_approved});

    dispatch({
      type: UPDATE_PROPERTY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Delete Property service
export const deleteProperty = ( id ) => async (dispatch) => {
  try {
    const res = await propertyService.deleteProperty({id});

    dispatch({
      type: DELETE_PROPERTY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Buy Property service
export const buyProperty = ( id ) => async (dispatch) => {
  try {
    const res = await propertyService.buyProperty({id});

    dispatch({
      type: BUY_PROPERTY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Add Owner to the Property service
export const addOwner = (id, email ) => async (dispatch) => {
  try {
    const res = await propertyService.addOwner({id, email});

    dispatch({
      type: ADD_OWNER,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// My Property List service
export const myProperties = () => async (dispatch) => {
  try {
    const res = await propertyService.MyProperties();

    dispatch({
      type: MY_PROPERTIES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

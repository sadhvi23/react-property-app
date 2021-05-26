import {
    ADD_PROPERTY, LIST_PROPERTY
} from "./types";

import { propertyService } from "../services/propertyService";

// Property Create service
export const addProperty = (name, is_approved, is_available, is_active) => async (dispatch) => {
  try {
    const res = await propertyService.addProperty({ name, is_approved, is_available, is_active });

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

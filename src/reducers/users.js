import {
    USER_LOGIN,
    USER_SIGNUP
  } from "../actions/types";
    
  const initialState = [];
  
  function userReducer(users = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOGIN:
        return [...users, payload];
      case USER_SIGNUP:
        return [...users, payload];
      default:
        return users;
    }
  };
  
  export default userReducer;
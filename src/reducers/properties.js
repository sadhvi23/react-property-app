import {
    ADD_PROPERTY,
    LIST_PROPERTY
  } from "../actions/types";
    
  const initialState = [];
  
  function propertyReducer(properties = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_PROPERTY:
        return [...properties, payload];
      case LIST_PROPERTY:
        return [...properties, payload];
      default:
        return properties;
    }
  };
  
  export default propertyReducer;
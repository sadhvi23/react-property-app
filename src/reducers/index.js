import { combineReducers } from "redux";
import users from "./users";
import properties from "./properties";

export default combineReducers({
  users, properties
});
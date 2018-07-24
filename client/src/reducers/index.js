import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // auth piece of state is manufactured by the authReducer!!!!!!!
  auth: authReducer
}); 

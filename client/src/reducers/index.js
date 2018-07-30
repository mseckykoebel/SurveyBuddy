import { combineReducers } from "redux";
// import a reducer that is already created for us, but rename b/c lmao
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

// wires together all of the reducers inside of the application
export default combineReducers({
  // auth piece of state is manufactured by the authReducer!!!!!!!
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});

// This is the auth reducer that deals with the user being logged in or not

import { FETCH_USER } from "../actions/types";
// Houses the authReducer
// initially, we dont know if the user is logged in or not
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // action.payload is the user model
      // action is the name of the object or the empty string
      // empty string is considered falsy, or not logged in!
      return action.payload || false;
    default:
      return state; // returns the origional state object
  }
}

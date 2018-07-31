import { FETCH_SURVEYS } from "../actions/types";

// create and export our reducer

export default function(state = [], action) {
  // surveys piece of state will be an empty ARRAY
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}

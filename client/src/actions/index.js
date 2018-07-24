import axios from "axios";
import { FETCH_USER } from "./types";

// becuase we are making a request, can use the async/await syntax

// get request, and pass in the routes that we care about
// only the relative path becuase of the way the dev and prod is being done

// when the action creator is called, returns a function
// if the function just contains the function, dispatch will be called anyway
export const fetchUser = () => async dispatch => {
  // dispatch an action after this request has been successfully completed
  // returns a promise
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

// only until we have the response from the api, then we respond with the action
// async request are being handeled here

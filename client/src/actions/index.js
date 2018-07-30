// NOTE: all of the action creators
import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// becuase we are making a request, can use the async/await syntax

// get request, and pass in the routes that we care about
// only the relative path becuase of the way the dev and prod is being done

// when the action creator is called, returns a function
// if the function just contains the function, dispatch will be called anyway
export const fetchUser = () => async dispatch => {
  // dispatch an action after this request has been successfully completed
  // returns a promise

  // the response to this is the new user model with the updated number of credits
  // the header auto-updates becuase this function and the one below it are
  // both the same
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

// only until we have the response from the api, then we respond with the action
// async request are being handeled here

// new action creator to send the token to the backend
export const handleToken = token => async dispatch => {
  // post request to the backend server
  const res = await axios.post("/api/stripe", token);

  // response says something, but what type of action are we dispatching???
  // assuming we are getting back the same user model, so updating the
  // user model as well as the whole logout thing
  dispatch({ type: FETCH_USER, payload: res.data });
};
// need to hook up the payments.js component

// NOTE: new action creator
// NOTE: this posts the form values to the backend API
// passes in the values object, makes a POST request to our server

export const submitSurvey = (history, values) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  // redirect to the survey page -> need the history object
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// gets a list of all of the surveys
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

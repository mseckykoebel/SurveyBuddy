// Houses the redux side of things
// Renders the root component
// Add the .css file extension for non-js files
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

// Creation of the redux store
// Import the reducers from the reducers folder
// In the args of the createStore function, pass the reducers
import reducers from "./reducers";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// Redux store attached to the react side of the app. by placing the
// provider tag

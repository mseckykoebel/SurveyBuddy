// functional Component
// surveyformreview shows users their form inputs
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// get all the different action creators
import * as actions from "../../actions";

// access the array that is located in surveyForm in order to display the
// review of all of the content on the page
import formFields from "./formFields";

// formValues- > keys contain the name of the fields
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // rendering the list logic for the "review" page
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        // arrow function so it is only done when the click occurs
        // action creator!
        onClick={() => submitSurvey(formValues, history)} // pass the action creator and pass the form values
        className="green btn-flat right white-text"
      >
        Send Survey!
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// state -> state object out of the redux store
function mapStateToProps(state) {
  return {
    // this is the values of the survey inside the state
    formValues: state.form.surveyForm.values,
  };
}

// redirects on the submit
// knows about the history object, and pass along to the action creator
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

// NOTE: Action creator -> change the data inside of the application

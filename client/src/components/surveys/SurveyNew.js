// top-level component responsibe for showing the survey form
// NOTE: SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  // this is the case with create-react-app, and is the same as setting state
  state = { showReview: false }; // do not show the component by default

  // helper method for displaying some page
  renderContent() {
    if (this.state.showFormReview /* is true */) {
      return (
        <SurveyFormReview
          onCancel={() => {
            this.setState({ showFormReview: false });
          }}
        />
      );
    }
    // run the callback, update the state in surveynew, and cause the survey form
    // to display this instead
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })} // run after form submitted
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>; // this runs the render method
  }
}

export default reduxForm({
  form: "surveyForm" // makes it so cancel actually cancels the form values
})(SurveyNew);

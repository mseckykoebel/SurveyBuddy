// top-level component responsibe for creating a new survey
// NOTE: Shows a form for the user to add input

// tells redux form to be in charge, and allows communicatio with the redux store
// FIELD: rendering any kind of traditional HTML, or showing the user text
// OR, one of our own, in this case, SurveyField.js!!!!
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form"; // the cool thing with the documentation
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
// {} used for when we are importing a tag

// iterate over the array, and return a custom field object for each one
// always can create and generate any list of fields
// located in the fields file in the same folder

// run the funciton each time there is an object
// new array returnd by map
// displayed inside the render method

class SurveyForm extends Component {
  // in charge of rendering all of the field
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      // rendering typefields for the survey
      // name: can be any string that is needed (anything)
      // component: appear as a basic HTML input tag
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// handleSubmit() is adding some additional props to the survey form
// one of the forms is handleSubmit!
// function will be called when the user submits the forms

// values is the object holding all of the values coming off of the form
// name of the fields and the content inside of the fields
// if the values object has any invalid entries, add something to the errors
// entires and it is OK if that is the case
function validate(values) {
  const errors = {};

  // NOTE: we check and see if there are emails at all...
  // returns a string that tells us the emails that are invalid
  errors.recipients = validateEmails(values.recipients || "");

  // for each field inside the fields array, pull off just the name property
  _.each(formFields, ({ name, noValueError }) => {
    // to look and see if there a value in the property name in the values object
    // if this property does not have a value assigned to it
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  // NOTE: when returned, if there are any errors in the object, and it matches
  // with the fields we are are passing, redux-form passes as a prop to the
  // custom-field component
  return errors; // empty, redux form thinks that there are no more errors
}

// redux form helper -> initalizes the surveyform
export default reduxForm({
  // easily add properties
  // feedback so  the user knows that they did the right thing
  validate: validate, // run when the user submits the form (ran automatically)
  form: "surveyForm",
  destroyOnUnmount: false, // NOTE: do not dump the values!!!!!!!!
})(SurveyForm);

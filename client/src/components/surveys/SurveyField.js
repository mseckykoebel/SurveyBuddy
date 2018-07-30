// NOTE: SurveyField contains logic to render a single label and text input
import React from "react";

// pulls off the input object
export default ({ input, label, meta: { error, touched } }) => {
  // SurveyField will show a text input! were doing ourselves
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error /*if both evaluate, shows the error message*/}
      </div>
    </div>
  );
};

// META -> we want the error message contained in this property tp appear on
// the screen

// {touched && error} -> making use of the way that JS handles these things
// touched is false, so the statmeent is not executed
// when the mouse enters, then exits, the string "You must enter a title" displays!!!

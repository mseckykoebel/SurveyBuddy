import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  // for every survey, return one of these special cards
  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div class="card darken-1">
          <div class="card-content">
            <span class="card-title">{survey.title}</span>
            <p>{survey.body}</p>
          </div>
          <div class="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  // using the helper method
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

// wire component to redux
// connect component
// wire up the action creator
// defina mapStateToProps that pulls in the list of surveys

function mapStateToProps({ surveys }) {
  return { surveys: surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);

import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
  return (
    <div className="main" href="styles.css" rel="stylesheet" type="text/css">
      <SurveyList />
      <div className="fixed-action-btn-large">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large orange darken-1 pulse"
          style={{ margin: "10px 5px" }}
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { Component } from "react";
import Header from "./Header.jsx";
import { Link } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <h1> About Us </h1>
        <p className="text-center" >
          This project was developed by Lighthouse Labs Students
        </p>
        <Link to = "/"> <button> Go home </button> </Link>
      </React.Fragment>
    );
  }
}
export default About;

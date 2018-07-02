import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="app">
          <p className="text-center enter">
            <Link to="/capture" className="btn btn-primary">
              Get Started!
            </Link>
          </p>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Home;

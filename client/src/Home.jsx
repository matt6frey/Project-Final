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
          <span className="text-center enter">
            <Link to="/capture">
              <button>Get Started! </button>
            </Link>
          </span>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Home;

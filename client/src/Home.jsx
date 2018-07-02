import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class Home extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="app">
            <span className="text-center enter">
              <Link to="/capture"> Get Started! </Link>
            </span>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default Home;

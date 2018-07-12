import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <footer>
        <p className="text-right">
          <Link to="/about" style={{display: "none"}}>About this site</Link>
        </p>
      </footer>
    );
  }
}
export default Footer;

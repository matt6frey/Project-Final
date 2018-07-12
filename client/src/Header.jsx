import React, { Component } from "react";
import logo from "./img/chef-logo-w.png"; // Tell Webpack this JS file uses this image

class Header extends Component {
  render() {
    return (
      <header>
        <div className="logo">
          <img
            src={logo}
            width="75px"
            height="auto"
            className="logo"
            alt="Right Recipe Logo"
          />
        </div>
        <h1 className="text-center">SnapCook</h1>
      </header>
    );
  }
}
export default Header;

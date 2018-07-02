import React, {Component} from 'react';
import logo from './img/chef-logo.png'; // Tell Webpack this JS file uses this image

class Header extends Component {
    render() {
      return (
      <header>
        <div className="logo">
          <img src={logo} width="75px" height="auto" className="logo"/>
        </div>
        <h1 className="text-center">Right Recipe</h1>
      </header>
      );
    }
  }
  export default Header;


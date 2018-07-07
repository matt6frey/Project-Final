import React, { Component } from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";


class Capture extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <form className="form-group text-center add-photo">
          <input
            type="file"
            accept="image/*"
            capture="camera"
            name="imgFile"
            onChange={this.props.showImage}
          />
          <img className='preview' src={this.props.imageURL} alt="" />

          <button
            className="btn btn-primary submit"
            type="submit"
            onClick={this.props.submitPic}
          >
          Submit
          </button>
        </form>
        <Link to = "/ingredients"> <button>Check Ingredients </button></Link>
        <Link to ="/"> <button> Start Over </button> </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Capture;

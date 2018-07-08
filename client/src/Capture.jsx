import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Capture extends Component {
  render() {
    let inputDisplay = {
      display: this.props.displayStateProp.chooseFile
    };
    let imageDisplay = {
      display: this.props.displayStateProp.image
    };

    let submitDisplay = {
      display: this.props.displayStateProp.submitPic
    };
    
    return (
      <React.Fragment>
        <Header />
        <form
          className="form
        -group text-center add-photo"
        >
          <input
            style={inputDisplay}
            type="file"
            accept="image/*"
            capture="camera"
            name="imgFile"
            onChange={this.props.showImage}
          />
          <img
            className="preview"
            style={imageDisplay}
            src={this.props.imageURL}
            alt=""
          />
          <Link to="/ingredients">
            <button
              className="btn btn-primary submit"
              type="submit"
              style={submitDisplay}
            >
              Submit
            </button>
          </Link>
        </form>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Capture;

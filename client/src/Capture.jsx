import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import Spinner from "react-spinkit";

class Capture extends Component {
  getCameraDiv(prop) {
    if (prop === "inline") {
      return (
        <div>
          <button>
            <span
              id="camera"
              style={{ display: this.props.displayStateProp.chooseFile }}
              className="fas fa-camera-retro fa-7x"
            />
            <span className="take-photo">Take Photo</span>
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
      let howToClasses = ["how-to-instructions"];
      if(this.props.addClass === 1) {
        howToClasses.pop();
        howToClasses.push('hideInstructions');
        setTimeout(function () {
          this.props.closeInstructions();
        }.bind(this), 1250);
      }
      if (this.props.addClass === 2) {
        howToClasses.pop();
        howToClasses.push('move');
      }
    return (


      <React.Fragment>
        <Header />
        <div className={howToClasses.join(' ')}>
        <h4>Welcome!</h4>

        <ol>
          <li>To begin, arrange the key ingredients you want to cook with on a flat surface.</li>
          <li>Take a photo and our app will detect your ingredients!</li>
          <li>Confirming your ingredients, you will be presented with a list of  recipes.</li>
        </ol>

        <p className="close-instructions" onClick={this.props.closeInstructions}>
          close <span className="ml-2 fas fa-times"></span>
        </p>
      </div>
        <p className="how-to">
          Take a photo of the key ingredients you want to cook with!
        </p>
        <form className="form-group text-center add-photo">
          {this.getCameraDiv(this.props.displayStateProp.chooseFile)}
          <input
            style={{
              display: this.props.displayStateProp.chooseFile
            }}
            type="file"
            accept="image/*"
            capture="camera"
            name="imgFile"
            onChange={this.props.showImage}
          />

          <img
            className="preview"
            style={{
              display: this.props.displayStateProp.image
            }}
            src={this.props.imageURL}
            alt=""
          />
          <Link to="/ingredients">
            <button
              className="btn btn-primary submit"
              type="submit"
              style={{
                display: this.props.displayStateProp.submitPic
              }}
            >
              Submit
            </button>
          </Link>
        </form>
        <div
          style={{
            display: this.props.displayStateProp.loadingBar
          }}
          className="spinner"
        >
          <Spinner name="ball-spin-fade-loader" />
          <p className="loading-text">Loading</p>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Capture;

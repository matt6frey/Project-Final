import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import Spinner from "react-spinkit";
import { connect } from 'react-redux';
import * as ActionCreator from './actions/AppActionCreator'
import axios from "axios";
import { displaySelector, photoLoadSelector, addClassSelector } from './selectors/selectors'

class Capture extends Component {
  
  showImage(event) {
    const name = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.props.displayChange({
        image: "block",
        chooseFile: "none",
        submitPic: "none",
        loadingBar: "block"
      });
      this.props.addPhoto({
        imageURL: reader.result,
        imageName: name
      })
      const fd = new FormData();
      fd.append("public_id", this.props.photoLoad.imageName);
      fd.append("upload_preset", "bkb49fvr");
      fd.append("file", this.props.photoLoad.imageURL);

      axios
        .post("https://api.cloudinary.com/v1_1/dybwmffcu/upload", fd)
        .then(res => {
          axios
            .post("/upload", {
              img: res.data.secure_url
            })
            .then(res => {
              this.props.addCompleteItemList(res.data)
              this.props.displayChange({
                submitPic: "block",
                chooseFile: "none",
                loadingBar: "none",
                loadingBarIngredient: "none"
              })
            })
            .catch(err => console.log(err))
        })
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  closeInstructions() {
    this.props.classIncrement()
  }

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
    let cameraClass = ["camera-show", "form-group", "text-center", "add-photo"];
    if (this.props.addClass === 1) {
      howToClasses.pop();
      howToClasses.push("hideInstructions");
      setTimeout(
        () => this.closeInstructions(),
        1200
      );
    }
    if (this.props.addClass === 2) {
      howToClasses.pop();
      howToClasses.push("move");
      cameraClass.shift();
    }

    const chooseFileStyle = this.props.displayStateProp.chooseFile
    return (
      <React.Fragment>
        <Header />
        <div className={howToClasses.join(" ")}>
          <h4>Welcome!</h4>

          <ol>
            <li>
              To begin, arrange the key ingredients you want to cook with on a
              flat surface.
            </li>
            <li>Take a photo and our app will detect your ingredients!</li>
            <li>
              Confirming your ingredients, you will be presented with a list of
              recipes.
            </li>
          </ol>

          <p
            className="close-instructions"
            onClick={this.closeInstructions.bind(this)}
          >
            close <span className="ml-2 fas fa-times" />
          </p>
        </div>
        <p className="how-to">
          Take a photo of the key ingredients you want to cook with!
        </p>

        <form className={cameraClass.join(" ")}>
          { 
            this.getCameraDiv(chooseFileStyle)
          }
          <input
            style={{
              display: chooseFileStyle
            }}
            type="file"
            accept="image/*"
            capture="camera"
            name="imgFile"
            onChange={this.showImage.bind(this)}
          />
          <img
            className="preview"
            style={{
              display: this.props.displayStateProp.image
            }}
            src={this.props.photoLoad.imageURL}
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

export default connect(
  (state, props) => Object.assign({
      displayStateProp: displaySelector(state, props),
      photoLoad: photoLoadSelector(state, props),
      addClass: addClassSelector(state, props)
    }), ActionCreator)(Capture);
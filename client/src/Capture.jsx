import React, { Component } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

// import cloudinary from "cloudinary-core";


// const cl = new cloudinary.Cloudinary({cloud_name:'dybwmffcu', api_key: '371654911193898', api_secret: '-QocRetk-uD_gz7pSYVSaaT6iTc'})
class Capture extends Component {
  constructor() {
    super();
    this.state = {
      imageURL: "",
      imageName: ""
    };
    this.showImage = this.showImage.bind(this);
  }
  showImage(event) {
    const name = event.target.files[0].name;
    console.log("NAME: ", name);

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        imageURL: reader.result,
        imageName: name
      });
    };
    console.log(reader.result, this.state.imgURL);
    reader.readAsDataURL(event.target.files[0]);
  }
  submitPic = event => {
    event.preventDefault();

    const fd = new FormData();
    fd.append('public_id', this.state.imageName)
    fd.append('upload_preset', 'bkb49fvr')
    fd.append('file', this.state.imageURL);

    axios
      .post('https://api.cloudinary.com/v1_1/dybwmffcu/upload',fd)
      .then(res => {
        axios.post('/upload', {
          img: res.data.secure_url
        }).then(res => {
          console.log(res);
        });
      });
    };

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
            onChange={this.showImage}
          />
          <img className='preview' src={this.state.imageURL} alt="" />
          <Link to = "/ingredients">
          <button
            className="btn btn-primary submit"
            type="submit"
            onClick={this.submitPic}
          >
            {" "}
            Submit{" "}
          </button>
          </Link>
        </form>
        <Link to ="/"> <button> Start Over </button> </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Capture;

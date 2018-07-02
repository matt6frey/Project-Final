import React, { Component } from "react";
import axios from 'axios';
class Capture extends Component {
  constructor() {
    super();
    this.state = {
      imageURL: ""
    }
    this.showImage = this.showImage.bind(this)
  }
  showImage(event){
    console.log(event.target.files[0])
    const reader = new FileReader()
    reader.onload = () => {
      this.setState({
        imageURL: reader.result
      })
    }
    reader.readAsDataURL(event.target.files[0])
  }
  submitPic = (event) => {
    event.preventDefault();
        // let file = event.target.files[0]

    // if (file){
    //   let data = new FormData()
    //   data.append('file', file)
    // }
    const fd = new FormData();
    fd.append('image', this.state.imageURL)
    axios.post('http://' + window.location.hostname + ':3001/photos',{
    image: this.state.imgURL
    }).then(res => console.log(res)).catch(err => console.log(err))

    // console.log(event.target.files[0])
  }
  render() {
    return (
      <form className='form-group text-center add-photo' >
      <p>
        <input type="file" accept="image/*" capture="camera" name='ingFile' onChange={this.showImage} />
      </p>
      <img src={this.state.imageURL} alt="" className="preview" />
      <button className="btn btn-primary submit" type="submit" onClick={this.submitPic}> Submit </button>
      </form>
    );
  }
}
export default Capture;
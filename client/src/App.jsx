import React, { Component } from "react";
import axios from "axios";
import Capture from "./Capture.jsx";
import Home from "./Home.jsx";
import Recipe from "./Recipe.jsx";
import RecipeList from "./RecipeList.jsx";
import { Switch, HashRouter, Route } from "react-router-dom";
import About from "./About.jsx";
import Ingredient from "./Ingredients.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      imageName: ""
    };
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
    fd.append("public_id", this.state.imageName);
    fd.append("upload_preset", "bkb49fvr");
    fd.append("file", this.state.imageURL);

    axios
      .post("https://api.cloudinary.com/v1_1/dybwmffcu/upload", fd)
      .then(res => {
        axios
          .post("/upload", {
            img: res.data.secure_url
          })
          .then(res => {
            console.log(res);
          });
      });
  };

  render() {
    return (
      <div className="app">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/capture"
              component={() => (
                <Capture
                  showImage={this.showImage.bind(this)}
                  submitPic={this.submitPic.bind(this)}
                  imgURL={this.state.imageURL}
                />
              )}
            />
            <Route exact path="/list" component={RecipeList} />
            <Route path="/list/:id" component={Recipe} />
            <Route path="/about" component={About} />
            <Route path="/ingredients" component={Ingredient} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default App;

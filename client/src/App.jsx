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
      photoLoad: {
        imageURL: null,
        imageName: null
      },
      recipes: [{
        rid: 1,
        title: 'MacAndCheese',
        image: '#',
        serves: 3,
        prepTime: 30,
        rating: '3/4',
        ingredients: ['mac', 'cheese'],
        steps:['Step1', 'Step2', 'Step3']
      },{
        rid: 2,
        title: 'TOMATO!',
        image: '#',
        serves: 3,
        prepTime: 30,
        rating: '3/4',
        ingredients: ['mac', 'cheese'],
        steps:['Step1', 'Step2', 'Step3']
      }],      
      selectedObj:null
    }
  }

  // -- METHODS FOR CAPTURE -------
  showImage(event) {
    const name = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        photoLoad: {
          imageURL: reader.result,
          imageName: name
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  submitPic = event => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("public_id", this.state.photoLoad.imageName);
    fd.append("upload_preset", "bkb49fvr");
    fd.append("file", this.state.photoLoad.imageURL);

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

  //-- METHODS FOR CONFIRMATION/INGREDIENTS PAGE

  // get ID from recipe List to render specific recipe page
  selectIDRecipe(selected_rid) {
    let obj = this.state.recipes.find(obj => {  
      return obj.rid === selected_rid;
    });
    console.log('SelectIDRecipe')
    this.setState({
      selectedObj: obj
    }, () => {console.log(this.state.selectedObj)
    console.log('Callback Complete')
    });
  }

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
            <Route
              exact path="/list"
              component={() => (
                <RecipeList
                  recipeList={this.state.recipes}
                  selectIDRecipe={this.selectIDRecipe.bind(this)}
                />
              )}
            />
            <Route
              path="/list/:id"
              component={() => (
                <Recipe
                selectedObj = {this.state.selectedObj}
                />
              )}
            />
            <Route path="/about" component={About} />
            <Route
              path="/ingredients"
              component={() => (
                <Ingredient
                  // items={this.state.items}
                  // deleteItem={this.deleteItem.bind(this)}
                  // addItem={this.addItem.bind(this)}
                />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
export default App;

import React, { Component } from "react";
import axios from "axios";
import Capture from "./Capture.jsx";
import Recipe from "./Recipe.jsx";
import RecipeList from "./RecipeList.jsx";
import { Switch, HashRouter, Route, Redirect } from "react-router-dom";
import About from "./About.jsx";
import Ingredient from "./Ingredients.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exists: true,
      photoLoad: {
        imageURL: null
      },
      display: {
        image: "none",
        choose_file: "block"
      }
    };
  }

  // ---- METHODS FOR INGREDIENTS

  deleteItem(event) {
    var array = [...this.state.items];
    let newArray = array.filter(obj => {
      return obj.name !== event.target.id;
    });
    this.setState({
      items: newArray
    });
  }

  addItem(new_item) {
    // ADD AXIOS AND ROUTE RESPONSE. IF RESPONSE OKAY, THEN ADD , ESLE DO NOT ADD AND ALERT THE USEr
    axios.get(`/validate-item/${new_item}`).then(res => {
      if (res.data !== false) {
        let newArray = this.state.items.concat(res.data);
        this.setState({ items: newArray });
      }
    });
  }

  // -- METHODS FOR CAPTURE -------
  showImage(event) {
    console.log(event.target);
    const name = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        display: {
          image: "block",
          chooseFile: "none"
        },
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
            this.setState({
              items: res.data
            });
          });
      });
  };

  // Recipes Method

  deleteRecipes() {
    // delete this.state.recipes;
    this.state.exists = true;
    this.setState({ recipes: undefined });
  }

  // Gets the object for rendering on individual page
  selectIDRecipe(selected_rid) {
    let recipes;
    if (this.state.recipes instanceof Array) {
      recipes = this.state.recipes;
    } else {
      recipes = Object.keys(this.state.recipes).map(key => {
        return this.state.recipes[key];
      });
    }
    let obj = recipes.find(obj => {
      return obj.rid === selected_rid;
    });
    console.log(obj);
    this.setState({
      selectedObj: obj
    });
  }
  // Gets all recipes
  getRecipes(event) {
    event.preventDefault();
    let selectedIngredients = [...this.state.items].map(i => i.name);

    console.log(selectedIngredients);
    axios.post("/recipe-lookup", { items: selectedIngredients }).then(res => {
      this.setState({
        recipes: res.data
      });
    });
  }

/*
<Route
  exact
  path="/list"
  component={() => (
    <RecipeList
      recipeList={this.state.recipes}
      selectIDRecipe={this.selectIDRecipe.bind(this)}
      deleteRecipes={this.deleteRecipes.bind(this)}
    />
  )}
/>
*/

  render() {
    return (
      <div className="app">
        <HashRouter>
        {(this.state.recipes) ? (
          <Switch>
          <Route
              path="/list/:id"
              component={() => (
                <Recipe
                selectedObj = {this.state.selectedObj}
                />
              )}
            />
          <Route
              exact path="/list"
              component={() => (
                <RecipeList
                  recipeList={this.state.recipes}
                  selectIDRecipe={this.selectIDRecipe.bind(this)}
                  deleteRecipes={this.deleteRecipes.bind(this)}
                />
              )}
          />
          <Redirect from='/ingredients' to='/list' />
          <Route path="/about" component={About} />
          </Switch>
          ) : (
          <Switch>
            <Route
             exact path="/"
              component={() => (
                <Capture
                  showImage={this.showImage.bind(this)}
                  submitPic={this.submitPic.bind(this)}
                  imageURL={this.state.photoLoad.imageURL}
                  displayStateProp={this.state.display}
                />
              )}
            />
            <Route path="/about" component={About} />
            <Route
              path="/ingredients"
              component={() => (
                <Ingredient
                  items={this.state.items}
                  deleteItem={this.deleteItem.bind(this)}
                  addItem={this.addItem.bind(this)}
                  getRecipes={this.getRecipes.bind(this)}
                />
              )}
            />
            </Switch>
          )}
        </HashRouter>
      </div>
    );
  }
}
export default App;

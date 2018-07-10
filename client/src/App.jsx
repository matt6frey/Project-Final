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
        chooseFile: "inline",
        submitPic: "none",
        loadingBar: "none",
        loadingBarIngredient: "none"
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
    // axios.get(`/validate-item/${new_item}`).then(res => {
      axios.get(`/api/validate-item/${new_item}`).then(res => {
      if (res.data !== false) {
        let newArray = this.state.items.concat(res.data);
        this.setState({ items: newArray });
      }
    });
  }

  // -- METHODS FOR CAPTURE -------
  showImage(event) {
    const name = event.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        display: {
          image: "block",
          chooseFile: "none",
          submitPic: "none",
          loadingBar: "block"
        },
        photoLoad: {
          imageURL: reader.result,
          imageName: name
        }
      });
      const fd = new FormData();
      fd.append("public_id", this.state.photoLoad.imageName);
      fd.append("upload_preset", "bkb49fvr");
      fd.append("file", this.state.photoLoad.imageURL);

      axios
        .post("https://api.cloudinary.com/v1_1/dybwmffcu/upload", fd)
        .then(res => {
          axios
            .post("/upload", {
            // .post("/upload", {
              img: res.data.secure_url
            })
            .then(res => {
              this.setState({
                items: res.data,
                display: {
                  submitPic: "block",
                  chooseFile: "none",
                  loadingBar: "none",
                  loadingBarIngredient: "none"
                }
              });
            });
        });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  // Recipes Method
  clearStates() {
    // delete this.state.recipes;
    this.setState({
      display: {
        image: "none",
        chooseFile: "inline",
        loadingBar: "none"
      },
      recipes: undefined
    });
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
    this.setState({
      selectedObj: obj
    });
  }
  // Gets all recipes
  getRecipes(event) {
    event.preventDefault();
    let selectedIngredients = [...this.state.items].map(i => i.name);
    this.setState({
      display: {
        loadingBarIngredient: "inline"
      }
    });

    // axios.post("/recipe-lookup", { items: selectedIngredients }).then(res => {
      axios.post("/api/recipe-lookup", { items: selectedIngredients }).then(res => {
      this.setState({
        recipes: res.data
      });
    });
  }

  render() {
    return (
      <div className="app">
        <HashRouter>
          {this.state.recipes ? (
            <Switch>
              <Route
                path="/list/:id"
                component={() => (
                  <Recipe selectedObj={this.state.selectedObj} />
                )}
              />
              <Route
                exact
                path="/list"
                component={() => (
                  <RecipeList
                    recipeList={this.state.recipes}
                    selectIDRecipe={this.selectIDRecipe.bind(this)}
                    clearStates={this.clearStates.bind(this)}
                  />
                )}
              />
              <Redirect from="/ingredients" to="/list" />
              <Route path="/about" component={About} />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Capture
                    showImage={this.showImage.bind(this)}
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
                    loadingBarDisplay={this.state.display.loadingBarIngredient}
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

import React, { Component } from "react";
import Recipe from "./Recipe.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class RecipeList extends Component {
  constructor(props) {
    super();
    this.state = {
      recipes: [
        {
          id: 1,
          recipeName: "Mac and Cheesy",
          recipeDescription:
            "----Delicious--------Delicious--------Delicious--------Delicious--------Delicious--------Delicious--------Delicious--------Delicious---------Delicious---------Delicious---------Delicious---------Delicious---------Delicious---------Delicious---------Delicious--------Delicious--------Delicious--------Delicious--------Delicious----"
        },
        {
          id: 2,
          recipeName: "Chicken Sandwich",
          recipeDescription:
            "----Amazing-------Amazing-------Amazing-------Amazing-------Amazing-------Amazing-------Amazing-------Amazing-------Amazing-------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing--------Amazing----"
        }
      ]
    };
  }

  getRecipe() {
    return this.state.recipes.map(item => {
      let complete_link = `/list/${item.id}`;
      return (
        <div className="recipe">
          <img src="" alt="" className="item-image" />
          <h3>
            <a href="">{item.recipeName}</a>
          </h3>
          <p className="description">{item.recipeDescription}</p>
          <p className="text-right">
            <Link to={complete_link}>
              <button href="" className="btn btn-primary">
                <span className="fas fa-utensils" /> Select
              </button>
            </Link>
          </p>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="recipe-list">{this.getRecipe()}</section>
        <Link to="/">
          {" "}
          <button> Start Over </button>{" "}
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}

export default RecipeList;

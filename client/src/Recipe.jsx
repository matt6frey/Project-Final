import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeInfo: {
        recipeName: "Mac and Cheese",
        prepTime: "12 mins",
        serveX: "4 people",
        ingredients: ["Mac", "Cheese", "Item3", "Item4", "Item5"],
        instructions: ["Step 1", "Step 2", "Step3"]
      }
    };
  }

  getIngredientList() {
    return this.state.recipeInfo.ingredients.map(item => {
      return <li>{item}</li>;
    });
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

  getInstructionList() {
    return this.state.recipeInfo.instructions.map(item => {
      return <li>{item}</li>;
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="recipe">
          <header>
            <h2>{this.state.recipeInfo.recipeName}</h2>
          </header>

          <div className="recipe-stats">
            <p>
              <strong>Prep Time:</strong> {this.state.recipeInfo.prepTime} |{" "}
              <strong>Serves:</strong> {this.state.recipeInfo.serveX}
            </p>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>{this.getIngredientList()}</ul>
          </div>

          <hr />

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>{this.getInstructionList()}</ol>
          </div>
          <Link to="/list">
            <button> Go back to Recipe List </button>
          </Link>
        </section>
        <Link to="/">
          {" "}
          <button> Start Over </button>{" "}
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Recipe;

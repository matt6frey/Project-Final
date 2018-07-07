import React, { Component } from "react";
import Recipe from "./Recipe.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class RecipeList extends Component {

  getRecipe() {
    return Object.keys(this.props.recipeList).map(item => {
      let recipelist = this.props.recipeList;
      let completeLink = `/list/${recipelist[item].rid}`;
      return (
        <div className="recipe">
          <h3>{recipelist[item].title}</h3>
          <img src={recipelist[item].image} alt="" className="item-image" />
          <p className="description">{recipelist[item].rating}</p>
          <p className="text-right">
            <Link to={completeLink} onClick={() => this.props.selectIDRecipe(recipelist[item].rid)}>
              <button href="" className="btn btn-primary" >
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
        <Link to="/" className="btn btn-primary" onClick={this.props.clearStates}>
          Start Over
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}

export default RecipeList;

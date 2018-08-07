import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
// import { displayChange, clearRecipes, addSelectedObject } from './actions/AppActionCreator'
import * as AppActionCreator from './actions/AppActionCreator'
class RecipeList extends Component {

// From main App.jsx
selectIDRecipe(selected_rid) {
  let recipes;
  if (this.props.recipeList instanceof Array) {
    recipes = this.props.recipeList;
  } else {
    recipes = Object.keys(this.props.recipeList).map(key => {
      return this.props.recipeList[key];
    });
  }
  let obj = recipes.find(obj => {
    return obj.rid === selected_rid;
  });

  this.props.addSelectedObject(obj)
}

clearStates() {
  this.props.displayChange({
      image: "none",
      chooseFile: "inline",
      loadingBar: "none",
      submitPic: "none"
  })
  this.props.clearRecipes()
}

  truncateTitle(str) {
    if(str.length > 29) {
      let end = str.search('-');
      if(end === -1) {
        return str.split(' ').slice(0,3).join(' ') + "...";
      }
      return str.substr(0, end);
    }
    return str;
  }

  getRecipe() {
    return Object.keys(this.props.recipeList).reverse().map(item => {
      let recipelist = this.props.recipeList;
      let completeLink = `/list/${recipelist[item].rid}`;
      let title = this.truncateTitle(recipelist[item].title);
      return (
        <div className="recipe" key={recipelist[item].rid}>
          <img src={recipelist[item].image} alt="" className="item-image" />
          <h3>{title}</h3>
          <p className="description">{recipelist[item].rating} Ingredients</p>
          <p className="text-right">
            <Link
              to={completeLink}
              onClick={() => this.selectIDRecipe(recipelist[item].rid)}
              className="select-recipe btn btn-primary"
            >
              <span className="fas fa-utensils" /> Select
            </Link>
          </p>
        </div>
      );
    });
  }

  noRecipes() {
    return (
      <div className="error">
        <h3 className="text-center my-3">No Recipes found!</h3>
        <img src="https://t3.ftcdn.net/jpg/00/73/79/40/240_F_73794000_tF1Q1e5vNP9n26VaFpZdGr7GceJRKXF4.jpg" className="img-fluid p-2" alt="No recipes found."/>
        <p className="text-center">We couldn't find any recipes matching your query. Please try adding more ingredients on another search.</p>
      </div>
    );
  }

  render() {
    let getContent;
    if(this.props.recipeList.length === 1) {
      getContent = this.noRecipes(this.props.recipeList[0]);
    } else {
      getContent = this.getRecipe();
    }
    return (
      <React.Fragment>
        <Header />
        <section className="recipe-list">{getContent}</section>
        <div className="actions">
          {/* <Link
            to="/"
            className="btn btn-primary"
            onClick={this.clearStates.bind(this)}
          >
            Start Over
          </Link> */}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => {
  return{
    recipeList: state.recipes,
    selectedObj: state.selectedObj
  }
}, AppActionCreator)(RecipeList);
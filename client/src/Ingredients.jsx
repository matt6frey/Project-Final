import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-spinkit";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import * as AppActionCreator from './actions/AppActionCreator'
import { displaySelector, itemsSelector, recommendSelector } from './selectors/selectors'

class Ingredient extends Component {

deleteItem(event) {
  var array = [...this.props.items];
  let newArray = array.filter(obj => {
    return obj.name !== event.target.id;
  });
  this.props.addCompleteItemList(newArray)
}

getRecipes(event) {
  event.preventDefault();
  let selectedIngredients = [...this.props.items].map(i => i.name);
  this.props.showIngredientLoading("inline")
  axios.post("recipe-lookup", { items: selectedIngredients }).then(res => {
    this.props.addRecipes(res.data)
  });
}


  capitalize(name) {
    return name.charAt(0).toUpperCase() + name.substr(1);
  }

  // Get the list of all items for rendering
  getItem() {
    let items = this.props.items;
    return items.map(item => {
      let name = this.capitalize(item.name);
      return (
        <div
          className="item"
          key={item.name}
          style={{ backgroundImage: `url(${item.url})` }}
        >
          <p className="item-name form-group-item">{name}</p>
          <button
            className="btn btn-secondary delete"
            value="delete"
            onClick={e => this.deleteItem(e)}
          >
            <span
              className="fas fa-times fa-2x"
              id={item.name}
              onClick={e => this.deleteItem(e)}
            />
          </button>
        </div>
      );
    });
  }

  // Erorr handle for empty text boxes add to list if valid
  getIndvItem(event) {
    event.preventDefault();
    let tempArray = [...this.props.items];
    let checkObject = tempArray.find(obj => {
      return obj.name === this.refs.newItem.value.toLowerCase();
    });
    if (!checkObject && this.refs.newItem.value !== "") {
      let newItem = this.refs.newItem.value;
      this.props.ThunkAddNewItem(newItem);
      this.refs.newItem.value = "";
    }
  }

  showRecipeBtn() {
    if (this.props.items.length > 0) {
      return (
        <Link to ="/list"
          onClick={this.getRecipes.bind(this)}
          className="btn btn-warning"
        >
          See Recipes
        </Link>
      );
    }
  }

  autofillRecommend({ target: { value } }) {
    if (value.length > 1) {
      let search = value.toLowerCase();
      axios.post("/recommend", { recommend: search }).then(res => {
        this.props.changeRecommend(res.data)
      });
    }
  }

  displayRecommendations() {

    return this.props.recommend.map(item => {
      return <option value={item.name} />;
    });
  }

  render() {
    if (this.props.items !== undefined) {
      return (
        <React.Fragment>
          <Header />
          <div className="form-group items">
            <div className="input-bar">
              <input
                type="text"
                ref="newItem"
                onKeyUp={this.autofillRecommend.bind(this)}
                list="suggestions"
              />
              <datalist id="suggestions">
                {this.displayRecommendations()}
              </datalist>
              <div
                style={{
                  display: this.props.displayState.loadingBarIngredient
                }}
                className="spinner"
              >
                <Spinner name="ball-spin-fade-loader" />
                <p className="loading-text">Loading</p>
              </div>
              <button
                type="submit"
                value="Add ingredient"
                onClick={this.getIndvItem.bind(this)}
                className="btn btn-primary"
              >
                Add Item
              </button>
            </div>
            <p className="how-to-ingredients">Confirm your ingredients.</p>
            {this.getItem()}
          </div>
          <div className="actions">{this.showRecipeBtn()}
          </div>
          <Footer />
        </React.Fragment>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
export default connect(
  (state) => {
  return{
      recommend: recommendSelector(state),
      items: itemsSelector(state),
      displayState: displaySelector(state)
  }
}, AppActionCreator)(Ingredient);
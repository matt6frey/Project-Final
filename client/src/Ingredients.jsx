import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
// import { CSSTransitionGroup } from "react-transition-group/CSSTransitionGroup";

class Ingredient extends Component {

  // Get the list of all items for rendering
  getItem() {
    let items = this.props.items;
    return items.map(item => {
      return (
        <div className="item" key={item.name}>
          <p className="item-name form-group-item">
            {item.name}
          </p>
          <button className="btn btn-secondary delete" value="delete">
            <span
              className="fas fa-times fa-2x"
              id={item.name}
              onClick={e => this.props.deleteItem(e)}
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
      return obj.IngredientName === this.refs.newItem.value;
    });

    if (!checkObject && this.refs.newItem.value !== "") {
      let newItem = this.refs.newItem.value;
      this.props.addItem(newItem);
      this.refs.newItem.value = "";
    }
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="form-group items">
          <div className="input-bar">
          <input type="text" ref="newItem" />
          <button
            type="submit"
            value="Add ingredient"
            onClick={this.getIndvItem.bind(this)}
            className="btn btn-primary"
          >
            Add Item
          </button>
          </div>
          {this.getItem()}
        </div>
        <div className="actions">
          <button className="btn btn-warning">
            <Link to="/list" onClick={this.props.getRecipes}>
              See Recipes
            </Link>
          </button>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Ingredient;

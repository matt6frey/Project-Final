import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Ingredient extends Component {

  // Get the list of all items for rendering
  getItem() {
    return this.props.items.map(item => {
      return (
        <div className="item" key={item.name}>
          <img
            src={item.image}
            alt="Ingredient"
            className="item-image"
            height="75px"
            width="75px"
          />
          <p className="item-name form-group-item">
            {" "}
            Name: {item.name} => Type: {item.type}
          </p>
          <button
            className="btn btn-secondary delete"
            value="delete">
            <span className="fas fa-trash-alt fa-lg" id={item.name} onClick={(e) => this.props.deleteItem(e)} />
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
          {this.getItem()}
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
        <div className="actions">
          <button type="submit" value="Get Recipes" className="btn btn-primary" onClick={this.props.getRecipes}>
            Submit
          </button>
          <Link to="/" className="btn btn-primary">
           Retake Picture
          </Link>

          <Link to="/list" onClick={this.props.getRecipes}>
            See Recipes
          </Link>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Ingredient;

import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Ingredient extends Component {
  constructor(recipeObject) {
    super();
    this.state = {
      newItem: null,
      items: [
        {
          id: 0,
          IngredientName: "apple",
          Image:
            "https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648"
        },
        {
          id: 1,
          IngredientName: "banana",
          Image:
            "data:image/webp;base64,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"
        }
      ]
    };
  }

  getItem() {
    return this.state.items.map(item => {
      return (
        <div className="item">
          <img
            src={item.Image}
            alt="Ingredient"
            className="item-image"
            height="75px"
            width="75px"
          />
          <p className="item-name form-group-item"> {item.IngredientName}</p>
          <button
            className="btn btn-secondary delete"
            onClick={this.deleteItem.bind(this)}
            value="delete"
          >
            <span className="fas fa-trash-alt fa-lg" id={item.IngredientName} />
          </button>
        </div>
      );
    });
  }

  deleteItem(event) {
    var array = [...this.state.items];
    let newArray = array.filter(obj => {
      return obj.IngredientName !== event.target.id;
    });
    this.setState({
      items: newArray
    });
  }

  addItem(event) {
    event.preventDefault();
    console.log(this.refs.newItem.value);
    let tempArray = [...this.state.items];
    let checkObject = tempArray.find(obj => {
      return obj.IngredientName === this.refs.newItem.value;
    });
    if (!checkObject && this.refs.newItem.value !== "" ) {
      // ADD AAXIOS AND ROUTE RESPONSE. IF RESPONSE OKAY, THEN ADD , ESLE DO NOT ADD AND ALERT THE USEr
      let new_item = this.refs.newItem.value;
      let id = Number(this.state.items.length);
      let newArray = this.state.items.concat({
        id: id,
        IngredientName: new_item,
        Image: null
      });
      this.setState({ items: newArray });
      this.refs.newItem.value = "";
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="form-group items">
          {this.getItem()}
          <input type="text" ref="newItem" onBlur={this.clearText} />
          <button
            type="submit"
            value="Get Recipes"
            onClick={this.addItem.bind(this)}
            className="btn btn-primary"
          >
            Add Item
          </button>
        </div>
        <button type="submit" value="Get Recipes" className="btn btn-primary">
          {" "}
          Submit{" "}
        </button>

        <Link to="/capture">
          {" "}
          <button className="btn btn-warning"> Retake Picture </button>{" "}
        </Link>

        <Link to="/list">
          <button className="btn btn-primary"> See Receipes </button>
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Ingredient;

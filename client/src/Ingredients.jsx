import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Ingredient extends Component {

  getImageType(items) {
    const foodTypes = {
      grains: 'https://res.cloudinary.com/dybwmffcu/image/upload/v1530932405/Icons/grains.png',
      meat: 'https://res.cloudinary.com/dybwmffcu/image/upload/v1530932454/Icons/meat.png',
      seed: 'https://res.cloudinary.com/dybwmffcu/image/upload/v1530932504/Icons/seed.png',
      spice: 'https://res.cloudinary.com/dybwmffcu/image/upload/v1530932506/Icons/spice.png',
      vegetable: 'https://res.cloudinary.com/dybwmffcu/image/upload/v1530932480/Icons/vegetables.png',
      fruit: 'https://res.cloudinary.com/dybwmffcu/image/upload/v1530932417/Icons/fruit.png'
    };
    items.forEach( (item) => {
      item.img = foodTypes[item.type];
    })
    return items;
  }
  // Get the list of all items for rendering
  getItem() {
    let items = this.getImageType(this.props.items);
    return items.map(item => {
      return (
        <div className="item" key={item.name}>
          <img
            src={item.img}
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

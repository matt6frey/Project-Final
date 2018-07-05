import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          image:
            "https://media.istockphoto.com/photos/red-apple-picture-id495878092?k=6&m=495878092&s=612x612&w=0&h=q9k5jN-1giBGZgTM6QhyKkPqtGf6vRpkgDzAwEz9DkY=",
          name: "apple",
          type: "fruit"
        },
        {
          image: "http://soappotions.com/wp-content/uploads/2017/10/orange.jpg",
          name: "orange",
          type: "fruit"
        },
        {
          image:
            "https://media.istockphoto.com/photos/banana-bunch-picture-id173242750?k=6&m=173242750&s=612x612&w=0&h=QJB3WhqIWcF1umqELWFUVu32OJWCuePabFClaMfRWbo=",
          name: "banana",
          type: "fruit"
        }
      ]
    };
  }

  deleteItem(event) {
    var array = [...this.state.items];
    let newArray = array.filter(obj => {
      console.log('event name is ' + event.target.id + 'object name is' + obj.name)
      if (obj.name === event.target.id) console.log(obj.name + 'names are same')
      return obj.name !== event.target.id;
    });
    console.log(newArray);
    this.setState({
      items: newArray
    });
  }

  addItem(new_item) {
    // ADD AXIOS AND ROUTE RESPONSE. IF RESPONSE OKAY, THEN ADD , ESLE DO NOT ADD AND ALERT THE USEr
    let newArray = this.state.items.concat({
      name: new_item,
      Image: null,
      type: "fruit"
    });

    this.setState({ items: newArray });
  }

  getItem() {
    return this.state.items.map(item => {
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
            value="delete"
          >
            <span className="fas fa-trash-alt fa-lg" id={item.name} onClick={(e) => this.deleteItem(e)} />
          </button>
        </div>
      );
    });
  }

  getIndvItem(event) {
    event.preventDefault();
    let tempArray = [...this.state.items];
    let checkObject = tempArray.find(obj => {
      return obj.IngredientName === this.refs.newItem.value;
    });

    if (!checkObject && this.refs.newItem.value !== "") {
      let newItem = this.refs.newItem.value;
      this.addItem(newItem);
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
            value="Get Recipes"
            onClick={this.getIndvItem.bind(this)}
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

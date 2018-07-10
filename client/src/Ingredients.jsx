import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
// import { CSSTransitionGroup } from "react-transition-group/CSSTransitionGroup";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommend: []
    };
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
            onClick={e => this.props.deleteItem(e)}
          >
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
      return obj.name === this.refs.newItem.value;
    });
    if (!checkObject && this.refs.newItem.value !== "") {
      let newItem = this.refs.newItem.value;
      this.props.addItem(newItem);
      this.refs.newItem.value = "";
    }
  }

  showRecipeBtn() {
    if (this.props.items.length > 0) {
      return (
        <button className="btn btn-warning">
          <Link to="/list" onClick={this.props.getRecipes}>
            See Recipes
          </Link>
        </button>
      );
    }
  }

  autofillRecommend({ target: { value } }) {
    if (value.length > 1) {
      axios.post("/recommend", { recommend: value }).then(res => {
        this.setState({
          recommend: res.data
        });
      });
    }
  }

  displayRecommendations() {
    let recommendations = this.state.recommend;

    return recommendations.map(item => {
      return <option value={item.name} />;
    });
  }

  render() {
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
        <div className="actions">{this.showRecipeBtn()}</div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Ingredient;

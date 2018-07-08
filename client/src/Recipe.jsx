import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import uuidv4 from "uuid/v4";

class Recipe extends Component {
  getIngredientList() {
    console.log(this.props);
    return this.props.selectedObj.ingredients.split("LOLOL").map(item => {
      return <li key={uuidv4()}>{item}</li>;
    });
  }

  getInstructionList() {
    return this.props.selectedObj.steps.split("LOLOL").map(item => {
      if (
        this.props.selectedObj.steps.split("LOLOL").length === 1 &&
        item.search(/(http:\/\/){1}[\S]{1,}/) > -1
      ) {
        let string = item.substr(0, item.search(/(http:\/\/){1}[\S]{1,}/));
        let href = item.substr(item.search(/(http:\/\/){1}[\S]{1,}/));
        console.log("STRING", string, "HREF:", href);
        return (
          <li key={uuidv4()}>
            {string}{" "}
            <a target="_blank" href={href}>
              link
            </a>.
          </li>
        );
      } else {
        return <li key={uuidv4()}>{item}</li>;
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="recipe">
          <header>
            <h2>{this.props.selectedObj.title}</h2>
          </header>
          <div className="recipe-stats">
            <p>
              <strong>Prep Time:</strong> {this.props.selectedObj.prep_time}{" "}
              minutes | <strong>Serves:</strong> {this.props.selectedObj.serves}
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
          <Link to="/list" className="btn btn-primary">
            Go back to Recipe List
          </Link>
        </section>
        <Link to="/" className="btn btn-primary">
          Start Over
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Recipe;

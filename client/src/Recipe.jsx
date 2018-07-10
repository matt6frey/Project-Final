import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import uuidv4 from "uuid/v4";

class Recipe extends Component {
  getIngredientList() {
    // console.log(this.props);
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

  getPrepTime(prepTime) {
    if (prepTime.prep_time) {
      return prepTime.prep_time;
    } else {
      return prepTime.prepTime;
    }
  }

  render() {
    let prepTime = this.getPrepTime(this.props.selectedObj);
    return (
      <React.Fragment>
        <Header />
        <section className="recipe">
          <header>
            <h2>{this.props.selectedObj.title}</h2>
            <img
              src={this.props.selectedObj.image}
              className="recipe-image"
              alt={`${this.props.selectedObj.title}`}
            />
          </header>
          <div className="recipe-stats">
            <p>
              <strong>
                <span className="far fa-clock fa-2x" alt="Prep Time" />
              </strong>
              <span className="recipe-stats-text">{prepTime} minutes</span>
              <strong className="ml-3">
                <span className="fas fa-users fa-2x" alt="Serves" />
              </strong>{" "}
              <span className="recipe-stats-text">
                {this.props.selectedObj.serves}
              </span>
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
          <div className="return-recipelist">
            <Link to="/list" className="btn btn-primary return">
              Go back to Recipe List
            </Link>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Recipe;

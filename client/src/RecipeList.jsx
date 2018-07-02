import React, { Component } from "react";
import Recipe from "./Recipe.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <section className="recipe-list">
          <div className="recipe">
            <img src="" alt="" className="item-image" />
            <h3>
              <a href="">Title</a>
            </h3>
            <p className="description">
              Lorem ipsum dolor sit amet, salutatus vituperata est eu, ut est
              exerci appareat ponderum. Per in solet deleniti repudiandae, te
              tibique ancillae disputationi his, quo adhuc delectus deseruisse
              cu. Sit ex unum nemore delicatissimi.
            </p>
            <p className="text-right">
              <a href="" className="btn btn-primary">
                <span className="fas fa-utensils" /> Select
              </a>
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default RecipeList;

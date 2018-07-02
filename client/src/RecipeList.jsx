import React, { Component } from "react";
import Recipe from "./Recipe.jsx";

class RecipeList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="recipe-list">
        <div className="recipe">
          <img src="" alt="" className="item-image" />
          <h3>
            <a href="">Title</a>
          </h3>
          < Recipe/>
          <p className="description">
            Lorem ipsum dolor sit amet, salutatus vituperata est eu, ut est
            exerci appareat ponderum. Per in solet deleniti repudiandae, te
            tibique ancillae disputationi his, quo adhuc delectus deseruisse cu.
            Sit ex unum nemore delicatissimi.
          </p>
          <p className="text-right">
            <a href="" className="btn btn-primary">
              <span className="fas fa-utensils"></span> Select
            </a>
          </p>
        </div>
      </section>
    );
  }
}

export default RecipeList;

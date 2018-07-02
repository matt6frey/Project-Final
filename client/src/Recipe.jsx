import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class Recipe extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <section className="recipe">
          <header>
            <h2>Title</h2>
          </header>

          <div className="recipe-stats">
            <p>
              <strong>Prep Time:</strong> XX mins | <strong>Serves:</strong> X
              people
            </p>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
              <li>Item</li>
            </ul>
          </div>

          <hr />

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              <li>
                Lorem ipsum dolor sit amet, salutatus vituperata est eu, ut est
                exerci appareat ponderum. Per in solet deleniti repudiandae, te
                tibique ancillae disputationi his, quo adhuc delectus deseruisse
                cu. Sit ex unum nemore delicatissimi
              </li>
              <li>
                Lorem ipsum dolor sit amet, salutatus vituperata est eu, ut est
                exerci appareat ponderum. Per in solet deleniti repudiandae, te
                tibique ancillae disputationi his, quo adhuc delectus deseruisse
                cu. Sit ex unum nemore delicatissimi
              </li>
              <li>
                Lorem ipsum dolor sit amet, salutatus vituperata est eu, ut est
                exerci appareat ponderum. Per in solet deleniti repudiandae, te
                tibique ancillae disputationi his, quo adhuc delectus deseruisse
                cu. Sit ex unum nemore delicatissimi
              </li>
            </ol>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
export default Recipe;

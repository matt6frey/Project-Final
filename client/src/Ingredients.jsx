import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Ingredient extends Component {
  render() {
    return (
      <div>
        <Header />
        <form action="" method="post" class="form-group items">
          <div class="item">
            <img src="" alt="" class="item-image" height="75px" width="75px" />
            <input type="text" class="item-name form-group-item" />
            <button class="btn btn-secondary delete" value="delete">
              <span class="fas fa-trash-alt fa-lg" />
            </button>
          </div>

          <div class="item">
            <img src="" alt="" class="item-image" height="75px" width="75px" />
            <input type="text" class="item-name form-group-item" />
            <button class="btn btn-secondary delete" value="delete">
              <span class="fas fa-trash-alt fa-lg" />
            </button>
          </div>

          <div class="item">
            <img src="" alt="" class="item-image" height="75px" width="75px" />
            <input type="text" class="item-name form-group-item" />
            <button class="btn btn-secondary delete" value="delete">
              <span class="fas fa-trash-alt fa-lg" />
            </button>
          </div>
          <div class="item">
            <img src="" alt="" class="item-image" height="75px" width="75px" />
            <input type="text" class="item-name form-group-item" />
            <button class="btn btn-secondary delete" value="delete">
              <span class="fas fa-trash-alt fa-lg" />
            </button>
          </div>
          <div class="item">
            <img src="" alt="" class="item-image" height="75px" width="75px" />
            <input type="text" class="item-name form-group-item" />
            <button class="btn btn-secondary delete" value="delete">
              <span class="fas fa-trash-alt fa-lg" />
            </button>
          </div>
          <button type="submit" value="Get Recipes" class="btn btn-primary">
            {" "}
            Submit{" "}
          </button>
        </form>
        <Link to="/capture">
          {" "}
          <button> Retake Picture </button>{" "}
        </Link>

        <Link to="/list">
          <button> See Receipes </button>
        </Link>
        <Footer />
      </div>
    );
  }
}
export default Ingredient;

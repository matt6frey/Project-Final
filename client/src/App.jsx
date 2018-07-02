import React, { Component } from "react";

import Capture from "./Capture.jsx";
import Home from "./Home.jsx";
import Recipe from "./Recipe.jsx";
import RecipeList from "./RecipeList.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
        <Router>
          <Route path="/capture" component={Capture} />
        </Router>
        <Router>
          <Route exact path="/list" component={RecipeList} />
        </Router>
        <Router>
          <Route path="/list/:id" component={Recipe} />
        </Router>
      </React.Fragment>
    );
  }
}
export default App;

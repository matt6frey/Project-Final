import React, { Component } from "react";

import Capture from "./Capture.jsx";
import Home from "./Home.jsx";
import Recipe from "./Recipe.jsx";
import RecipeList from "./RecipeList.jsx";
import { Switch, HashRouter, Route} from "react-router-dom";
import About from "./About.jsx"
import Ingredient from "./Ingredients.jsx"

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/capture" component={Capture} />
          <Route exact path="/list" component={RecipeList} />
          <Route path="/list/:id" component={Recipe} />
          < Route path = "/about" component={About} />
          <Route path = "/ingredients" component={Ingredient} />
        </Switch>
      </HashRouter>
    );
  }
}
export default App;

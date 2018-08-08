import React, { Component } from "react";
import Capture from "./Capture.jsx";
import Recipe from "./Recipe.jsx";
import RecipeList from "./RecipeList.jsx";
import { Switch, HashRouter, Route, Redirect } from "react-router-dom";
import Ingredient from "./Ingredients.jsx";
import { connect } from 'react-redux';
import { recipesSelector } from './selectors/selectors'

// const App = (props) => {
//   return (
//     <div className="app">
//       <HashRouter>
//         {props.recipes ? (
//           <Switch>
//             <Route
//               path="/list/:id"
//               component={() => (
//                 <Recipe/>
//               )}
//             />
//             <Route
//               exact
//               path="/list"
//               component={() => (
//                 <RecipeList/>
//               )}
//             />
//             <Redirect from="/ingredients" to="/list" />
//             <Route path="/about" component={About} />
//             <Redirect to="/" />
//           </Switch>
//         ) : (
//           <Switch>
//             <Route
//               exact
//               path="/"
//               component={() => (
//                 <Capture/>
//               )}
//             />
//             <Route path="/about" component={About} />
//             <Route
//               path="/ingredients"
//               component={() => (
//                 <Ingredient/>
//               )}
//             />
//             <Redirect to="/" />
//           </Switch>
//         )}
//       </HashRouter>
//     </div>
//   )
// }
class App extends Component {
  render() {
    return (
      <div className="app">
        <HashRouter>
          {this.props.recipe ? (
            <Switch>
              <Route
                path="/list/:id"
                component={() => (
                  <Recipe/>
                )}
              />
              <Route
                exact
                path="/list"
                component={() => (
                  <RecipeList/>
                )}
              />
              <Redirect from="/ingredients" to="/list" />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Capture/>
                )}
              />
              <Route
                path="/ingredients"
                component={() => (
                  <Ingredient/>
                )}
              />
              <Redirect to="/" />
            </Switch>
          )}
        </HashRouter>
      </div>
    );
  }
}
export default connect(
  (state) => {
  return{
    recipe: recipesSelector(state)
  }
})(App);
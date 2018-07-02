import React, {Component} from 'react';
import Header from './Header.jsx';
import Capture from './Capture.jsx';
import Home from './Home.jsx';
import Recipe from './Recipe.jsx';
import RecipeList from './RecipeList.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Header/>
      <Capture/>
      <Home />
      <RecipeList />
      <Footer />
      </div>
    );
  }
}
export default App;

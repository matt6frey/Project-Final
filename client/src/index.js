import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/style.css";
import App from "./App.jsx";
import {Provider} from 'react-redux'
import store from './lib/store.js'
ReactDOM.render(
<Provider store ={store}>
<App />
</Provider>, document.getElementById("root"));

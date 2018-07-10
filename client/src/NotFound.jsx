import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

const NotFound = () => (
  <React.Fragment>
    <Header />
    <form className="form-group text-center add-photo">
      <h4 style={{color: 'orange'}} > 404 Error : Page not found </h4>
      <img
        className="preview"
        src="https://cdn.shopify.com/s/files/1/1061/1924/products/Frowning_Emoji_Icon_30260b4f-d601-45f5-9bb3-836f607cacbc_large.png?v=1513251036"
        alt=""
      />
    </form>
    <div className="text-center">
      <Link to="/" className="btn btn-primary"> Go back to the main page </Link>
    </div>
    <Footer />
  </React.Fragment>
);
export default NotFound;

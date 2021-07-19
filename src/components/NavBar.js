import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
const LOGO_URL = "";
export default class NavBar extends Component {
  render() {
    return (
      <div className="header">
        <span>
          <img className="logo-img" src={LOGO_URL} />
        </span>
        <span className="header-element">
          <Link to="/clients" className="navBarElement">
            clients
          </Link>
        </span>
        <span className="header-element">
          <Link to="/actions" className="navBarElement">
            actions
          </Link>
        </span>
        <span className="header-element">
          <Link to="/analytics" className="navBarElement">
            analytics
          </Link>
        </span>
      </div>
    );
  }
}

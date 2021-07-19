import React, { Component } from "react";
import "../../css/Badge.css";
const IMAGE_URL = "https://icon-library.com/images/world-icon/world-icon-3.jpg";
export default class HottestCountry extends Component {
  render() {
    return (
      <div className="badgeBox">
        <img src={IMAGE_URL} className="imageIcon" />
        <h3 className="newClientCount">{this.clientOfCurrentMounth}</h3>
        <h6 className="currentMounth"> New {this.currentMounth} Clients</h6>
      </div>
    );
  }
}

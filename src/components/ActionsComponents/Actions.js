import React, { Component } from "react";
import Add from "./Add";
import Update from "./Update";
import "../../css/Actions.css";
export default class extends Component {
  render() {
    return (
      <div>
        <div>
          <Update />
          <div className="dividingLine"></div>
          <Add />
        </div>
      </div>
    );
  }
}

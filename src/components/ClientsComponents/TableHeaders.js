import React, { Component } from "react";
import "../../css/TableHeaders.css";
export default class TableHeaders extends Component {
  render() {
    return (
      <tr className="tableHeaders">
        <th>first</th>
        <th>last</th>
        <th>country</th>
        <th>First</th>
        <th>Email</th>
        <th>Sold</th>
        <th>Owner</th>
      </tr>
    );
  }
}

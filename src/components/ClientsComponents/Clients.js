import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TableHeaders from "./TableHeaders";
import ClientRow from "./ClientRow";
import "../../css/Clients.css";
const axios = require("axios");
class Clients extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    axios.get("http://localhost:8080/clients?from=0&to=10").then((response) => {
      this.props.ClientsStoring.setClients(response.data);
    });
  }
  requestHandle = (from, to, updateState) => {
    axios
      .get(
        `
        http://localhost:8080/clients?from=${from}&to=${to}`
      )
      .then((response) => {
        this.props.ClientsStoring.setClientsPerPage(
          response.data,
          this.props.ClientsStoring.currentPage + updateState
        );
      });
  };
  nextClick = () => {
    this.requestHandle(
      (this.props.ClientsStoring.currentPage + 1) * 10,
      (this.props.ClientsStoring.currentPage + 1) * 10 + 10,
      1
    );
  };
  backClick = () => {
    this.requestHandle(
      (this.props.ClientsStoring.currentPage - 1) * 10,
      (this.props.ClientsStoring.currentPage - 1) * 10 + 10,
      -1
    );
  };

  render() {
    return (
      <div className="clients">
        <div className="inputArea">
          <TextField id="standard-basic" label="Search" />
          <div className="select">
            <select>
              <option value="volvo">A</option>
            </select>
          </div>
        </div>
        <div className="backNextField">
          <ArrowBackIosIcon className="backArrow" onClick={this.backClick} />
          <span>{this.props.ClientsStoring.currentPage}</span>-<span>41</span>
          <ArrowForwardIosIcon className="nextArrow" onClick={this.nextClick} />
        </div>
        <div className="clientsTable">
          <table>
            <TableHeaders />
            {this.props.ClientsStoring.clients.map((client) => {
              return <ClientRow client={client} />;
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default inject("ClientsStoring")(observer(Clients));

import React, { Component } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import "../../css/Actions.css";
const UPDATE_CLIENT = "http://localhost:8080/client";
const SEND_EMAIL = "http://localhost:8080/sendemail";
class Update extends Component {
  constructor() {
    super();
    this.state = {
      clientNameInput: "",
      owner: "",
      email_type: "",
    };
  }

  sendEmailClick = () => {
    this.sendRequest(this.state.email_type, this.state.clientNameInput);
  };

  sendRequest = (email_type, clientName) => {
    axios.put(
      SEND_EMAIL + "/?" + "email=" + email_type + "&name=" + clientName
    );
  };

  transferClick = () => {
    this.transferRequest(this.state.owner, this.state.clientNameInput);
  };

  transferRequest = (owner, clientName) => {
    axios.put(UPDATE_CLIENT + "/?" + "owner=" + owner + "&name=" + clientName);
  };

  handelRequest = (event) => {
    this.setState({ clientNameInput: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ owner: event.target.value });
  };

  handleSelectType = (event) => {
    this.setState({ email_type: event.target.value });
  };

  componentDidMount() {
    axios.get("http://localhost:8080/owners").then((response) => {
      this.props.GlobalStore.setOwners(response.data);
    });
  }
  render() {
    return (
      <div className="updateSection">
        <h3>Update</h3>
        Client Name :{" "}
        <input
          type="text"
          onChange={this.handelRequest}
          className="clientNameInput"
          value={this.state.clientNameInput}
        />
        <div className="optionArea">
          Transfer ownership to :{" "}
          <select
            className="selectUpdate"
            onChange={this.handleSelect}
            value={this.state.owner}
          >
            {this.props.GlobalStore.owners.map((o, index) => {
              return (
                <option key={index} value={o.owner}>
                  {o.owner}
                </option>
              );
            })}
          </select>
          <button className="buttonUpdate" onClick={this.transferClick}>
            transfer
          </button>
        </div>
        <div className="optionArea">
          Send Email :{" "}
          <select className="selectUpdate" onChange={this.handleSelectType}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <button className="buttonUpdate" onClick={this.sendEmailClick}>
            Send
          </button>
        </div>
        <div className="optionArea">
          Declare Sale ! <button className="buttonUpdate">Declare</button>
        </div>
      </div>
    );
  }
}
export default inject("GlobalStore")(observer(Update));

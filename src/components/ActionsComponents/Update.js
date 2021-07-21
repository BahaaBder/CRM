import React, { Component } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import "../../css/Actions.css";
const UPDATE_OWNER = "http://localhost:8080/owner";
const SEND_EMAIL = "http://localhost:8080/sendemail";
const UPDATE_SALE = "http://localhost:8080/updatesale";
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

  transferClick = () => {
    this.transferRequest(this.state.owner, this.state.clientNameInput);
  };

  sendRequest = (email_type, clientName) => {
    axios.put(
      SEND_EMAIL + "/?" + "email=" + email_type + "&name=" + clientName
    );
  };

  transferRequest = (owner, clientName) => {
    axios.put(UPDATE_OWNER + "/?" + "owner=" + owner + "&name=" + clientName);
  };

  handleInputClientName = (event) => {
    this.setState({ clientNameInput: event.target.value });
  };

  handleSelectOwner = (event) => {
    this.setState({ owner: event.target.value });
  };

  handleSelectEmailType = (event) => {
    this.setState({ email_type: event.target.value });
  };

  handleDeclareSale = () => {
    axios.put(UPDATE_SALE, { clientName: this.state.clientNameInput });
  };
  componentDidMount() {
    axios.get("http://localhost:8080/owners").then((response) => {
      this.props.ClientsStoring.setOwners(response.data);
    });
  }
  render() {
    return (
      <div className="updateSection">
        <h3>Update</h3>
        <div className="updateForm">
          Client Name :{" "}
          <input
            type="text"
            onChange={this.handleInputClientName}
            className="clientNameInput"
            value={this.state.clientNameInput}
          />
        </div>

        <div className="updateForm">
          Transfer ownership to :{" "}
          <select
            className="selectUpdate"
            onChange={this.handleSelectOwner}
            value={this.state.owner}
          >
            {this.props.ClientsStoring.owners.map((o, index) => {
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
        <div className="updateForm">
          Send Email :{" "}
          <select
            className="selectUpdate"
            onChange={this.handleSelectEmailType}
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <button className="buttonUpdate" onClick={this.sendEmailClick}>
            Send
          </button>
        </div>
        <div className="updateForm">
          Declare Sale !{" "}
          <button className="buttonUpdate" onClick={this.handleDeclareSale}>
            Declare
          </button>
        </div>
      </div>
    );
  }
}
export default inject("ClientsStoring")(observer(Update));

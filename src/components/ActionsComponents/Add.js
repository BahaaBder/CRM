import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../../css/Actions.css";
import axios from "axios";
const ADD_CLIENT = "http://localhost:8080/clientSave";
export default class Add extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      countryName: "",
      ownerName: "",
    };
  }
  saveClient = () => {
    if (this.isValidInputs()) {
      axios.post(ADD_CLIENT, this.state);
    } else {
      alert("Check Your Inputs !!");
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  isValidInputs = () => {
    if (
      this.state.firstName.length == 0 ||
      this.state.lastName.length == 0 ||
      this.state.countryName.length == 0 ||
      this.state.ownerName.length == 0
    ) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    return (
      <div className="addSection">
        <h3>ADD CLIENT</h3>
        <div className="addInputTextField">
          First Name :{" "}
          <input type="text" name="firstName" onChange={this.handleChange} />
        </div>
        <div className="addInputTextField">
          SurName{" "}
          <input type="text" name="lastName" onChange={this.handleChange} />
        </div>
        <div className="addInputTextField">
          Country:{" "}
          <input type="text" name="countryName" onChange={this.handleChange} />
        </div>
        <div className="addInputTextField">
          Owner:{" "}
          <input type="text" name="ownerName" onChange={this.handleChange} />
        </div>
        <Button variant="contained" color="secondary" onClick={this.saveClient}>
          Add New Client
        </Button>
      </div>
    );
  }
}

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
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
      showMessageAddSucceful: false,
    };
  }

  saveClient = async () => {
    if (this.isValidInputs()) {
      await axios.post(ADD_CLIENT, this.state);
      this.setState({ showMessageAddSucceful: true });
    } else {
      alert("Check Your Inputs !!");
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  closeModal = () => {
    this.setState({ showMessageAddSucceful: false });
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
        <Modal
          isOpen={this.state.showMessageAddSucceful}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,.7)",
            },
            content: {
              color: "orange",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "black",
            },
          }}
        >
          <div onClickCapture={this.closeModal}>X</div>
          Add the client success
        </Modal>
      </div>
    );
  }
}

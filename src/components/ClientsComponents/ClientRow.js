import React, { Component } from "react";
import "../../css/Table.css";
import Modal from "react-modal";
const axios = require("axios");
const UPDATE_CLIENT_DATA = "http://localhost:8080/updateclient";
export default class ClientRow extends Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
      firstName: "",
      surName: "",
      country: "",
    };
    this.oldData = {};
  }

  componentDidMount = () => {
    this.fillData();
  };

  handleRequest = () => {
    this.setState({ openModal: false });
    let updateInformationObject = {
      oldData: this.oldData,
      newName: this.state.firstName,
      newSurName: this.state.surName,
      newCountry: this.state.country,
    };
    axios.put(UPDATE_CLIENT_DATA, updateInformationObject);
  };

  fillData = () => {
    this.setState({
      firstName: this.props.client.first,
      surName: this.props.client.last,
      country: this.props.client.country,
    });
    this.oldData = {
      oldfirstName: this.props.client.first,
      oldsurName: this.props.client.last,
      oldcountry: this.props.client.country,
    };
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  closeModal = () => {
    this.setState({
      openModal: false,
      firstName: this.oldData.oldfirstName,
      surName: this.oldData.oldsurName,
      country: this.oldData.oldcountry,
    });
  };

  render() {
    const client = this.props.client;
    return (
      <tr
        className="tableRows"
        onClick={() => this.setState({ openModal: true })}
      >
        <td>{this.state.firstName}</td>
        <td>{this.state.surName}</td>
        <td>{this.state.country}</td>
        <td>{client.date}</td>
        <td>{client.email_type}</td>
        <td>{client.sold}</td>
        <td>{client.owner}</td>
        <Modal
          isOpen={this.state.openModal}
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
          <div onClickCapture={this.closeModal} className="exitButton">
            X
          </div>
          <h1>Update User</h1>
          <div className="userInput">
            Name:{" "}
            <input
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
            />
          </div>
          <div className="userInput">
            SurName:{" "}
            <input
              type="text"
              name="surName"
              onChange={this.handleChange}
              value={this.state.surName}
            />
          </div>
          <div className="userInput">
            Country:{" "}
            <input
              type="text"
              name="country"
              onChange={this.handleChange}
              value={this.state.country}
            />
          </div>
          <button onClickCapture={this.handleRequest} className="updateButton">
            Update
          </button>
        </Modal>
      </tr>
    );
  }
}

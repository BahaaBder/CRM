import React, { Component } from "react";
import "../../css/TableHeaders.css";
import Popup from "reactjs-popup";
import Modal from "react-modal";

export default class TableRow extends Component {
  constructor() {
    super();
    this.state = {
      openModal: false,
    };
  }
  render() {
    const client = this.props.client;
    return (
      <tr
        className="tableRows"
        onClick={() => this.setState({ openModal: true })}
      >
        <td>{client.first}</td>
        <td>{client.last}</td>
        <td>{client.country}</td>
        <td>{client.date}</td>
        <td>{client.email_type}</td>
        <td>{client.sold}</td>
        <td>{client.owner}</td>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={() => this.setState({ openModal: false })}
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
          <div onClickCapture={() => this.setState({ openModal: false })}>
            X
          </div>
          <h1>Update User</h1>
          <div>
            Name: <input type="text" value={client.first} />
          </div>
          <div>
            SurName: <input type="text" value={client.last} />
          </div>
          <div>
            Country: <input type="text" value={client.country} />
          </div>
          <button>Update</button>
        </Modal>
      </tr>
    );
  }
}

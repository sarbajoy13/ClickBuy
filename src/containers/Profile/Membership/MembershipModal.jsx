import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class MembershipModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Prime Member</ModalHeader>
        <ModalBody>
          <p className="lead">
            Do you want to become a <span className="text-danger">PRIME</span>{" "}
            member?
          </p>
          <p
            className=""
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Subcription cost: $9.99/month
          </p>
          <p className="lead mt-4 mb-0">Enter card details for payment:</p>
          <div className="d-flex flex-column">
            <div className="my-2">
              <label htmlFor="cardNo">Card No</label>
              <input
                type="text"
                name="cardNo"
                className="form-control"
                //value={this.state.cardNo}
                placeholder="16 digit card no"
                //onChange={(e)=>{this.setState({cardNo:e.target.value})}}
              />
            </div>
            <div className="my-2">
              <label htmlFor="cardHolder">Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                className="form-control"
                //value={this.state.cardHolder}
                placeholder="card holder name"
                //onChange={(e)=>{this.setState({cardHolder:e.target.value})}}
              />
            </div>
            <div className="my-2">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                name="cvv"
                className="form-control"
                //value={this.state.cvv}
                placeholder="3 digit cvv"
                //onChange={(e)=>{this.setState({cvv:e.target.value})}}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-danger mx-1" onClick={this.props.toggle}>
              Cancel
            </button>
            <button
              className="btn btn-success mx-1"
              onClick={this.props.becomeMember}
            >
              Become Member
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MembershipModal;

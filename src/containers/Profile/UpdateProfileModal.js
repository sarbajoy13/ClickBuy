import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../routes/api";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

class UpdateProfileModal extends Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
    contact: this.props.user.contact,
    address: this.props.user.address,
    creditCard: this.props.user.creditCard,
  };
  resetFields = () => {
    this.setState({
      username: "",
      email: "",
      contact: "",
      address: "",
      creditCard: "",
    });
  };

  updateProfile = async () => {
    if (this.state.username === null) {
      toast.warning("Username must be there");
    } else if (
      this.state.contact === null ||
      this.state.contact.length !== 10
    ) {
      toast.warning("Check Contact No");
    } else if (
      this.props.user.role === "seller" &&
      this.state.creditCard.length !== 16
    ) {
      toast.warning("Check Credit Card No");
    } else {
      const body = {
        id: this.props.user.id,
        username: this.state.username,
        contact: this.state.contact,
        address: this.state.address,
        creditCard: this.state.creditCard,
      };
      console.log(body);
      await axios
        .put(api.developmentServer + "/users/update-user", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.resetFields();
          localStorage.setItem("user", JSON.stringify(res.data.result));
          this.props.authenticate();
          this.props.setuser();
          toast.success("User Profile Updated");
        })
        .catch((err) => console.log(err));
      this.props.toggle();
    }
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Update Profile</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column py-3">
            <div className="my-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.username}
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="email">Email (not updatable)</label>
              <input
                type="text"
                name="brand"
                disabled
                className="form-control"
                value={this.state.email}
              />
            </div>
            <div className="my-2">
              <label htmlFor="contact">Contact</label>
              <input
                type="number"
                name="contact"
                className="form-control"
                value={this.state.contact}
                onChange={(e) => {
                  this.setState({ contact: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={this.state.address}
                onChange={(e) => {
                  this.setState({ address: e.target.value });
                }}
              />
            </div>
            {this.props.user.role === "seller" ? (
              <div className="my-2">
                <label htmlFor="creditCard">Credit Card Detail</label>
                <input
                  type="number"
                  name="creditCard"
                  id="usedYears"
                  className="form-control"
                  value={this.state.creditCard}
                  onChange={(e) => {
                    this.setState({ creditCard: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-danger mx-1" onClick={this.props.toggle}>
              Cancel
            </button>
            <button
              className="btn btn-success mx-1"
              onClick={this.updateProfile}
            >
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    authenticate: () =>
      dispatch({ type: actionTypes.AUTHENTICATE, data: true }),
  };
};
export default connect(null, mapDispatchtoProps)(UpdateProfileModal);

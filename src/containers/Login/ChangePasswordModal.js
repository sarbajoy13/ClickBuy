import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import api from "../../routes/api";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
export class ChangePasswordModal extends Component {
  state = {
    password: "",
    cpassword: "",
  };
  changePassword = async () => {
    const url = api.developmentServer + "/user/change-password";
    if (this.state.password !== this.state.cpassword) {
      toast.warning("Password and confirm password must be same");
    } else {
      const body = {
        email: this.props.email,
        password: this.state.password,
      };
      await axios.post(url, body).then((res) => {
        if (res.data.responseType) {
          toast.success(res.data.message);
          this.props.toggle();
          this.props.history.push("/login");
        }
      });
    }
  };
  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <h5>Change Your Password</h5>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex flex-column py-3">
              <div className="my-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  placeholder="password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.cpassword}
                  placeholder="password"
                  onChange={(e) => {
                    this.setState({ cpassword: e.target.value });
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex flex-row justify-content-center">
              <button
                className="btn btn-success mx-1"
                onClick={this.changePassword}
              >
                Change Password
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ChangePasswordModal);

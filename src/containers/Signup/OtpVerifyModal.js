import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import api from "../../routes/api";
import { withRouter } from "react-router";
class OtpVerifyModal extends Component {
  state = {
    otp: "",
    msg: "",
  };
  signUp = async () => {
    const body = {
      otp: this.state.otp - "0",
    };
    await axios
      .post(api.developmentServer + "/user/validate-otp", body)
      .then((res) => {
        if (!res.data.responseType) {
          this.setState({ msg: res.data.message });
        } else {
          axios
            .post(api.developmentServer + "/user/create", this.props.user)
            .then((res) => {
              console.log("Sign Up: ", res.data);
              if (res.data.responseType) {
                /*localStorage.setItem("user", JSON.stringify(res.data.result));
                this.props.authenticate();
                toast.success(res.data.message);
                this.props.history.push("/home");*/
                toast.success(
                  "Account created. Now login with your credentials"
                );
                this.props.history.push("/login");
              } else {
                toast.warning(res.data.message);
                this.props.history.push("/login");
              }
            })
            .catch((err) => console.log(err));
          this.props.toggle();
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <h5>Enter otp sent to {this.props.user.email}</h5>
            <h4 className="text-danger">{this.state.msg}</h4>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex flex-row align-items-center justify-content-between py-3">
              <div className="my-2 w-75">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.otp}
                  placeholder="6 digit otp"
                  onChange={(e) => {
                    this.setState({ otp: e.target.value, msg: "" });
                  }}
                />
              </div>
              <div className="my-2">
                <button
                  className="btn btn-primary mx-1 mt-4"
                  onClick={this.props.reSendOtp}
                >
                  Resend OTP
                </button>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center">
              <button className="btn btn-success mx-1" onClick={this.signUp}>
                SignUp
              </button>
            </div>
          </ModalBody>
          {/* <ModalFooter>
            <div className="d-flex flex-row justify-content-center">
              <button className="btn btn-success mx-1" onClick={this.signUp}>
                SignUp
              </button>
            </div>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    authenticate: () =>
      dispatch({ type: actionTypes.AUTHENTICATE, data: true }),
  };
};

export default connect(null, mapDispatchtoProps)(withRouter(OtpVerifyModal));

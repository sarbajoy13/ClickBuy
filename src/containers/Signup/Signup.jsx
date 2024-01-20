import React, { Component } from "react";
import axios from "axios";
import api from "../../routes/api";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import OtpVerifyModal from "./OtpVerifyModal";
import { withRouter } from "react-router";

class SignUp extends Component {
  state = {
    createOtpVerifyModal: false,
    username: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
    creditCard: "",
    contact: "",
    address: "",
    user: "",
  };
  toggleOtpVerifyModal = () => {
    this.setState((pS, props) => {
      return {
        createOtpVerifyModal: !pS.createOtpVerifyModal,
      };
    });
  };
  getOtp = async () => {
    const url = api.developmentServer + "/user/send-otp";
    this.state.user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      contact: this.state.contact,
      address: this.state.address,
      role: this.state.role,
      creditCard: this.state.role === "seller" ? this.state.creditCard : "",
    };
    const body = {
      name: this.state.username,
      email: this.state.email,
    };
    this.toggleOtpVerifyModal();
    await axios
      .post(url, body)
      .then((res) => {
        console.log("OTP Send: ", res.data);
        if (res.data.responseType) {
          toast.success(res.data.message);
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  reSendOtp = async () => {
    const url = api.developmentServer + "/user/send-otp";
    const body = {
      name: this.state.username,
      email: this.state.email,
    };
    await axios
      .post(url, body)
      .then((res) => {
        console.log("OTP Send: ", res.data);
        if (res.data.responseType) {
          toast.success(res.data.message);
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  validateEmail = (email) => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(email);
  };
  signUpValidation = () => {
    if (this.state.username.trim() === "") {
      toast.warning("Username is mandatory field");
    } else if (!this.validateEmail(this.state.email)) {
      toast.warning("Email field wrong");
    } else if (this.state.password !== this.state.cpassword) {
      toast.warning("Confirm password not equal to password");
    } else if (this.state.role.trim() === "") {
      toast.warning("Role is mandatory field");
    } else if (this.state.role === "seller" && this.state.creditCard === "") {
      toast.warning("Enter credit card number to receive a payment");
    } else {
      this.getOtp();
    }
  };
  render() {
    return (
      <div
        className="pt-5 d-flex px-2"
        style={{
          height: "100vh",
          background: "rgb(2,0,36)",
          background:
            "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,113,121,1) 35%, rgba(0,212,255,1) 100%)",
          width: "100vw",
        }}
      >
        <div
          className="my-auto mx-auto d-flex flex-column justify-content-around py-2"
          style={{
            width: "40vw",
            minWidth: "500px",
            height: "500px",
            //borderRadius: "30px",
          }}
        >
          <h2 className="text-center text-white font-weight-bold">
            Create a ClickBuy Account
          </h2>
          <div className="d-flex flex-column w-75 mx-auto justify-content-around">
            {/* <input
              type="text"
              className="form-control py-2 px-3 my-1"
              placeholder="Full Name"
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            /> */}
            <input
              type="text"
              className="form-control py-2 px-3 my-1"
              placeholder="UserName"
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <input
              type="text"
              className="form-control py-2 px-3 my-1"
              placeholder="E-mail"
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <input
              type="text"
              className="form-control py-2 px-3 my-1"
              placeholder="Contact No."
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.contact}
              onChange={(e) => this.setState({ contact: e.target.value })}
            />
            <input
              type="text"
              className="form-control py-2 px-3 my-1"
              placeholder="Address"
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            />
            <input
              type="password"
              className="form-control py-2 px-3 my-1"
              placeholder="Password"
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <input
              type="password"
              className="form-control py-2 px-3 my-1"
              placeholder="Confirm Password"
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.cpassword}
              onChange={(e) => this.setState({ cpassword: e.target.value })}
            />
            <select
              className="form-control py-2 px-3 mt-1"
              onChange={(e) => this.setState({ role: e.target.value })}
              style={{
                borderRadius: "20px",
                fontSize: "20px",
              }}
              value={this.state.role}
              placeholder="Select Role"
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
            {this.state.role === "seller" && (
              <input
                type="text"
                className="form-control py-2 px-3 my-1 mb-4"
                placeholder="Credit Card(for Seller)"
                style={{
                  borderRadius: "20px",
                  fontSize: "20px",
                }}
                value={this.state.creditCard}
                onChange={(e) => this.setState({ creditCard: e.target.value })}
              />
            )}
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button
              className="btn btn-primary w-50 btn-lg"
              onClick={this.signUpValidation}
            >
              Sign Up
            </button>
          </div>
        </div>
        <OtpVerifyModal
          show={this.state.createOtpVerifyModal}
          toggle={this.toggleOtpVerifyModal}
          reSendOtp={this.reSendOtp}
          user={this.state.user}
        />
      </div>
    );
  }
}

/*const mapDispatchtoProps = (dispatch) => {
  return {
    authenticate: () =>
      dispatch({ type: actionTypes.AUTHENTICATE, data: true }),
  };
};

export default connect(null, mapDispatchtoProps)(SignUp);*/
export default withRouter(SignUp);

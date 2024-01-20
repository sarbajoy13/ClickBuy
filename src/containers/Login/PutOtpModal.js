import axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import api from '../../routes/api';
import ChangePasswordModal from './ChangePasswordModal'
export class PutOtpModal extends Component {
    state = {
        showChangePassword: false,
        otp: "",
        msg: "",
    }
    toggleChangePassword = () => {
        this.setState((pS, props) => {
            return {
                showChangePassword: !pS.showChangePassword,
            };
        });
    }
    reSendOtp = async () => {
        const body = {
            email: this.props.email,
        }
        axios.post(api.developmentServer + "/user/send-otp", body).then(res => {
            toast.success(res.data.message);
        })
    }
    validateOtp = async () => {
        const body = {
            otp: this.state.otp,
        }
        await axios
            .post(api.developmentServer + "/user/validate-otp", body)
            .then((res) => {
                if (!res.data.responseType) {
                    this.setState({ msg: res.data.message });
                }
                else {
                    this.props.toggle();
                    this.toggleChangePassword();
                }
            })
            .catch((err) => console.log(err));

    }
    render() {
        return (
            <div>
                <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h5>Enter otp sent to {this.props.email}</h5>
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
                                <button className="btn btn-primary mx-1 mt-4" onClick={this.reSendOtp}>Resend OTP</button>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-center">
                            <button className="btn btn-success mx-1" onClick={this.validateOtp}>
                                Submit
                            </button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/*<div className="d-flex flex-row justify-content-center">
                            <button className="btn btn-success mx-1" onClick={this.validateOtp}>
                                Submit
                            </button>
                                </div>*/}
                    </ModalFooter>
                </Modal>
                <ChangePasswordModal show={this.state.showChangePassword} toggle={this.toggleChangePassword} email={this.props.email} />
            </div>
        )
    }
}

export default withRouter(PutOtpModal)

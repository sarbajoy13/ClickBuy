import axios from 'axios';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import api from '../../routes/api';
import PutOtpModal from "./PutOtpModal";
export class PutEmailModal extends Component {
    state = {
        email: "",
        showPutOtp: false,
    }
    togglePutOtp = () => {
        this.setState((pS, props) => {
            return {
                showPutOtp: !pS.showPutOtp,
            };
        });
    }
    getOtp = async () => {
        const url = api.developmentServer + "/user/check-user";
        const body = {
            email: this.state.email,
        }
        axios.post(url, body).then(res => {
            if (!res.data.responseType) {
                toast.warning(res.data.message);
                this.props.history.push("/signup");
            }
            else {
                this.props.toggle();
                this.togglePutOtp();
                axios.post(api.developmentServer + "/user/send-otp", body).then(res => {
                    toast.success(res.data.message);
                }).catch((err) => console.log(err));
            }
        }).catch((err) => console.log(err));
    }
    validateEmail = (email) => {
        const pattern =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return pattern.test(email);
    };
    signUpValidation = () => {
        if (!this.validateEmail(this.state.email)) {
            toast.warning("Email field wrong");
        }
        else {
            this.getOtp();
        }
    };
    render() {
        return (
            <div>
                <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        <h5>Enter Your Email Id</h5>
                    </ModalHeader>
                    <ModalBody>
                        <div className="d-flex flex-column py-3">
                            <div className="my-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    placeholder="email"
                                    onChange={(e) => {
                                        this.setState({ email: e.target.value });
                                    }}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex flex-row justify-content-center">
                            <button className="btn btn-success mx-1" onClick={this.signUpValidation}>
                                Get OTP
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
                <PutOtpModal show={this.state.showPutOtp} toggle={this.togglePutOtp} email={this.state.email} />
            </div>
        )
    }
}

export default withRouter(PutEmailModal)

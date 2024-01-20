import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class UserDetailsModal extends Component {
  state = {
    userdetail: "",
  };
  render() {
    return (
   
      this.props.user && (
        <div>
          <Modal size="xl" isOpen={this.props.show} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
              <h3>User Details</h3>
            </ModalHeader>
            <ModalBody>
              {/* <div className="d-flex flex-column py-3">
              <div className="my-2">
                <h3>Name : </h3>
                <h4>{this.props.user.username}</h4>
              </div>
              <div className="my-2">
                <h3>Email : </h3>
                <h4>{this.props.user.email}</h4>
              </div>
              <div className="my-2">
                <h3>Contact : </h3>
                <h4>{this.props.user.contact}</h4>
              </div>
              <div className="my-2">
                <h3>Address : </h3>
                <h4>{this.props.user.address}</h4>
              </div>
              <div className="my-2">
                <h3>Primember : </h3>
                <h4>{this.props.user.primemember ? "Yes" : "No"}</h4>
              </div>
              <div className="my-2">
                <h3>Role : </h3>
                <h4>{this.props.user.role}</h4>
              </div>
              <div className="my-2">
                <h3>Account Details : </h3>
                <h4>
                  {this.props.user.acdetail
                    ? this.state.userdetail.acdetail
                    : "None"}
                </h4>
              </div>
            </div> */}
              <div className="row px-2">
                {this.props.user.primemember ? (
                  <div className="col-md-3 bg-white text-center">
                    <div className="d-flex flex-column my-3 mx-1">
                      <div>
                        <img
                          className="w-100"
                          src="/membercard.png"
                          alt="cardimg"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="col-md-12">
                  <div className="d-flex flex-column ml-1 bg-white">
                    <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                      <div className="col-3">
                        <p className="fs-24">Name</p>
                      </div>
                      <div className="col-9">
                        <p className="fs-20">{this.props.user.username}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                      <div className="col-3">
                        <p className="fs-24">Email</p>
                      </div>
                      <div className="col-9">
                        <p className="fs-20">{this.props.user.email}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                      <div className="col-3">
                        <p className="fs-24">Member</p>
                      </div>
                      <div className="col-9">
                        <p className="fs-20">
                          {this.props.user.primemember ? "Prime" : "General"}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                      <div className="col-3">
                        <p className="fs-24">Mobile</p>
                      </div>
                      <div className="col-9">
                        <p className="fs-20">{this.props.user.contact}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                      <div className="col-3">
                        <p className="fs-24">Role</p>
                      </div>
                      <div className="col-9">
                        <p className="fs-20">
                          {this.props.user.role === "admin"
                            ? "ADMIN"
                            : this.props.user.role === "buyer"
                            ? "BUYER"
                            : "SELLER"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="d-flex flex-row justify-content-center">
                <button
                  className="btn btn-primary mx-1"
                  onClick={this.props.toggle}
                >
                  Close
                </button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      )
    );
  }
}

export default UserDetailsModal;

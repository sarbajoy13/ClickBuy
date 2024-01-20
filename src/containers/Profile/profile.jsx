import React, { Component } from "react";
import MembershipModal from "./Membership/MembershipModal";
import api from "../../routes/api";
import axios from "axios";
import UpdateProfileModal from "./UpdateProfileModal"
class Profile extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    member: false,
    showUpdateProfile: false,
  };
  setUser = () => {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) })
  }
  toggleUpdateProfile = () => {
    this.setState({ showUpdateProfile: !this.state.showUpdateProfile })
  }
  toggleMember = () => {
    this.setState({ member: !this.state.member });
  };
  componentWillMount() {
    if (!this.state.user) {
      this.props.history.replace("/login");
    }
  }
  becomeMember = async () => {
    const url =
      api.developmentServer + "/user/primemember/" + this.state.user.id;
    await axios
      .put(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log("Prime member: ", res.data);
        if (res.data.responseType) {
          this.setState({ user: res.data.result });
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data.result));
        }
        this.toggleMember();
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      this.state.user && (
        <div className="container my-5">
          <div className="row mt-5 px-2">
            <div className="col-md-6 bg-white mt-5 text-center">
              <div className="d-flex flex-column my-3 mx-1">
                <div>
                  {this.state.user.primemember ? (
                    <img
                      className="w-100"
                      src="/membercard.png"
                      alt="cardimg"
                    />
                  ) : (
                    <img
                      className="w-100"
                      src="/membercard.png"
                      style={{
                        filter: "blur(10px)",
                      }}
                      alt="cardimg"
                    />
                  )}
                  {!this.state.user.primemember && (
                    <p className="lead mt-3">
                      Become a member{" "}
                      <span
                        className="text-primary"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={this.toggleMember}
                      >
                        here
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-5">
              <div className="d-flex flex-column ml-1 bg-white">
                <h1
                  className="mx-2"
                  style={{
                    fontSize: "48px",
                  }}
                >
                  <ins>Profile</ins>
                </h1>
                <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                  <div className="col-3">
                    <p className="fs-24">Name</p>
                  </div>
                  <div className="col-9">
                    <p className="fs-20">{this.state.user.username}</p>
                  </div>
                </div>
                <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                  <div className="col-3">
                    <p className="fs-24">Email</p>
                  </div>
                  <div className="col-9">
                    <p className="fs-20">{this.state.user.email}</p>
                  </div>
                </div>
                <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                  <div className="col-3">
                    <p className="fs-24">Member</p>
                  </div>
                  <div className="col-9">
                    <p className="fs-20">
                      {this.state.user.primemember ? "Prime" : "General"}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                  <div className="col-3">
                    <p className="fs-24">Mobile</p>
                  </div>
                  <div className="col-9">
                    <p className="fs-20">{this.state.user.contact}</p>
                  </div>
                </div>
                <div className="d-flex flex-row mx-2 border-bottom my-2 align-items-center">
                  <div className="col-3">
                    <p className="fs-24">Role</p>
                  </div>
                  <div className="col-9">
                    <p className="fs-20">
                      {this.state.user.role === "admin"
                        ? "ADMIN"
                        : this.state.user.role === "buyer"
                          ? "BUYER"
                          : "SELLER"}
                    </p>
                  </div>
                </div>
              </div>
              <button className="col-6 btn btn-primary" onClick={this.toggleUpdateProfile}>Update</button>
            </div>
          </div>
          <MembershipModal
            show={this.state.member}
            toggle={this.toggleMember}
            becomeMember={this.becomeMember}
          />
          <UpdateProfileModal
            show={this.state.showUpdateProfile}
            toggle={this.toggleUpdateProfile}
            user={this.state.user}
            setuser={this.setUser} />
        </div>
      )
    );
  }
}

export default Profile;

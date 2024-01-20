import axios from "axios";
import React, { Component } from "react";
import api from "../../../routes/api";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";
import UserDetailsModal from "./UserDetailsModal";

export class ViewUsers extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    id: "",
    users: [],
    showUserDetail: false,
    selectedUser: null,
  };
  toggleUserDetail = () => {
    this.setState((pS, props) => {
      return {
        showUserDetail: !pS.showUserDetail,
      };
    });
  };
  //   userDetail(uid) {
  //     this.props.history.push(`/userdetails/${uid}`);
  //   }
  getAllUsers = async () => {
    await axios
      .get(api.developmentServer + "/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        this.setState({ users: res.data.results });
      })
      .catch((err) => console.log(err));
  };
  componentWillMount() {
    if (this.state.user) {
      this.props.authenticate();
      this.getAllUsers();
    } else {
      this.props.history.replace("/login");
    }
  }
  render() {
    return (
      
      this.state.user && this.state.user.role==="admin" && (
        <div className="mt-5">
          <div className="container my-5">
            <div className="row mt-5">
              <h2 className="text-center my-4">Users List</h2>
              <table className="table table-striped table-bordered text-center">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Users Email</th>
                    <th>User Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            this.setState(
                              { selectedUser: this.state.users[index] },
                              this.toggleUserDetail
                            );
                          }}
                        >
                          View User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <UserDetailsModal
            show={this.state.showUserDetail}
            toggle={this.toggleUserDetail}
            user={this.state.selectedUser}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.authUser,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    authenticate: () =>
      dispatch({ type: actionTypes.AUTHENTICATE, data: true }),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ViewUsers);

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

class Logout extends Component {
  componentDidMount() {
    this.props.unauthenticate();
    console.log(JSON.parse(localStorage.getItem("user")));
    localStorage.removeItem("user");
    console.log(JSON.parse(localStorage.getItem("user")));
    localStorage.removeItem("access");
    this.forceUpdate();
    this.props.history.replace("/");
  }
  render() {
    return <div></div>;
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    unauthenticate: () =>
      dispatch({ type: actionTypes.AUTHENTICATE, data: false }),
  };
};

export default connect(null, mapDispatchtoProps)(Logout);

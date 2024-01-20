import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import DonateModal from "../../containers/Donation/DonateModal";
import { withRouter } from "react-router";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import styles from './header.module.css';

class Header extends Component {
  state = {
    // user: this.props.location.hasOwnProperty("user")
    //   ? this.props.location.user
    //   : JSON.parse(localStorage.getItem("user")),
    user: JSON.parse(localStorage.getItem("user")),
    drop: false,
    showDonate: false,
    forceRefresh: false,
    auth: true,
  };
  toggleDonateModal = () => {
    this.setState((pS, props) => {
      return {
        showDonate: !pS.showDonate,
      };
    });
  };
  componentWillMount() {
    if (this.state.user) {
      this.props.authenticate();
    }
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark fixed-top"
        style={{
          backgroundColor: "#3C5186",
        }}
      >
        <div className="container">
          <p className="navbar-brand mb-0 font-weight-bold text-white">
            ClickBuy
          </p>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/*{this.state.user ?
            <div id="navbarNav"
            className="collapse navbar-collapse d-flex justify-content-end">
          <a className="btn text-white btn-outline-primary m-2" href="#electronics">Electronics</a>
          <a className="btn text-white btn-outline-primary m-2" href="#clothing">Clothes</a>
          <a className="btn text-white btn-outline-primary" href="#accessories">Home Accessories</a>
        </div>:
          null
          }*/}
          <div
            id="navbarNav"
            className="collapse navbar-collapse d-flex justify-content-end"
          >
            <ul className="navbar-nav" id="navbarNav">
              {this.props.auth && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/home">
                    Home
                  </Link>
                </li>
              )}
              {this.props.auth &&
              this.state.user &&
              this.state.user.role === "admin" ? (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/users">
                    Users
                  </Link>
                </li>
              ) : (
                <>
                  {this.props.auth &&
                  this.state.user &&
                  this.state.user.role === "seller" ? (
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/ads">
                        Advertisements
                      </Link>
                    </li>
                  ) : null}
                  {this.props.auth && (
                    <li className="nav-item">
                      <Link to="/checkout" className="nav-link text-white">
                        <i class="fa fa-lg fa-shopping-cart"></i>
                      </Link>
                    </li>
                  )}
                </>
              )}
              {!this.props.auth ? (
                <>
                  <li className="nav-item mx-1">
                    <Link
                      onClick={this.toggleDonateModal}
                      className="nav-link text-warning mx-1 font-weight-bold"
                    >
                      Donate
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      to="/homepage"
                      className={"nav-link font-weight-bold " + styles.headerhome} 
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      to="/aboutus"
                      className={"nav-link font-weight-bold " + styles.aboutus}
                    >
                      About Us
                    </Link>
                  </li>

                  <li className="nav-item mx-1">
                    <Link
                      to="/contactus"
                      className={"nav-link font-weight-bold " + styles.contactus}
                    >
                      Contact Us
                    </Link>
                  </li>


                  <li className="nav-item mx-1">
                    <Link
                      to="/signup"
                      className={"nav-link font-weight-bold " + styles.contactus}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link
                      to="/login"
                      className="nav-link font-weight-bold btn bg-white text-primary px-5"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item mx-2 d-flex align-items-center">
                  <Dropdown
                    isOpen={this.state.drop}
                    toggle={() => this.setState({ drop: !this.state.drop })}
                  >
                    <DropdownToggle
                      className="nav-link border-0"
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <i
                        class="fa fa-2x my-auto border-0 text-white fa-user-circle display-6"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link
                          to="/profile"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <p className="w-100 text-dark text-center py-2 m-0">
                            Profile
                          </p>
                        </Link>
                      </DropdownItem>
                      {this.state.user && this.state.user.role !== "admin" && (
                        <div>
                        <DropdownItem>
                          <Link
                            to="/orders"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <p className="w-100 text-dark text-center py-2 m-0">
                              Orders
                            </p>
                          </Link>
                          
                        </DropdownItem>
                        <DropdownItem>
                        <Link
                          to="/chats"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <p className="w-100 text-dark text-center py-2 m-0">
                            Chats
                          </p>
                        </Link>
                        
                      </DropdownItem>
                      </div>
                      )}
                      {this.state.user && this.state.user.role === "seller" && (
                        <DropdownItem>
                          <Link
                            to="/revenue"
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <p className="w-100 text-dark text-center py-2 m-0">
                              Revenue
                            </p>
                          </Link>
                        </DropdownItem>
                      )}
                      <DropdownItem>
                        <Link
                          to="/logout"
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <p className="w-100 text-dark text-center py-2 m-0">
                            Logout
                          </p>
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              )}
            </ul>
          </div>
        </div>
        <DonateModal
          show={this.state.showDonate}
          toggle={this.toggleDonateModal}
        />
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user.authUser,
    user: state.user.userData,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    authenticate: () =>
      dispatch({ type: actionTypes.AUTHENTICATE, data: true }),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Header);
// export default withRouter(Header);

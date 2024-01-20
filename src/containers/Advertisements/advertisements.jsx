import React, { Component } from "react";
import CreateAdModal from "./CreateAdModal/CreateAdModal";
import axios from "axios";
import SingleProduct from "./SingleProduct/SingleProduct";
import api from "../../routes/api";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

class Advertisements extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    ads: [],
    pending: [],
    rejected: [],
    createModal: false,
    activeTab: "1",
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleCreateModal = () => {
    this.setState((pS, props) => {
      return {
        createModal: !pS.createModal,
      };
    });
  };

  getAdvertisements = async () => {
    await axios
      .get(
        api.developmentServer + "/api/products-by-user/" + this.state.user.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((res) => {
        console.log("Advertisements: ", res.data);
        if (res.data.responseType) {
          this.setState({ ads: res.data.results });
          this.getPendingAds();
        }
      })
      .catch((err) => console.log(err));
  };

  getPendingAds = async () => {
    await axios
      .get(
        api.developmentServer + "/api/pendingProducts/" + this.state.user.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((res) => {
        console.log("Pending Advertisements: ", res.data);
        if (res.data.responseType) {
          this.setState({ pending: res.data.results });
          this.getRejectedAds();
        }
      })
      .catch((err) => console.log(err));
  };

  getRejectedAds = async () => {
    await axios
      .get(
        api.developmentServer + "/api/rejectedProducts/" + this.state.user.id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      )
      .then((res) => {
        console.log("Rejected Advertisements: ", res.data);
        if (res.data.responseType) {
          this.setState({ rejected: res.data.results });
        }
      })
      .catch((err) => console.log(err));
  };

  componentWillMount() {
    if (!this.state.user) {
      this.props.history.replace("/login");
    } else {
      this.getAdvertisements();
    }
  }
  render() {
    return (
      this.state.user && (
        <div className="container-lg pt-5 my-5">
          <div className="row">
            <div className="d-flex justify-content-start">
              <h1>Your Advertisements</h1>
            </div>
          </div>
          <div className="row my-2">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-lg btn-dark"
                onClick={this.toggleCreateModal}
                title="Add Advertisement"
              >
                <i className="fa text-white fa-plus"></i>
              </button>
            </div>
          </div>
          <Nav tabs>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink
                className={this.state.activeTab === "1" ? "active" : ""}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Live
              </NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink
                className={this.state.activeTab === "2" ? "active" : ""}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Pending
              </NavLink>
            </NavItem>
            <NavItem style={{ cursor: "pointer" }}>
              <NavLink
                className={this.state.activeTab === "3" ? "active" : ""}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Rejected
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="row my-5">
                {this.state.ads.length > 0 ? (
                  <div className="d-flex flex-row flex-wrap row overflow-auto">
                    {this.state.ads.map((product) => (
                      <div className="col-3">
                        <SingleProduct
                          key={"ads" + product.id}
                          cid={product.id}
                          ctext={product.name}
                          cbrand={product.brand}
                          cprice={product.price}
                          src={product.image}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="display-3">No Live Ads Yet</p>
                )}
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="row my-5">
                {this.state.pending.length > 0 ? (
                  <div className="d-flex flex-row flex-wrap row overflow-auto">
                    {this.state.pending.map((product) => (
                      <div className="col-3">
                        <SingleProduct
                          key={"pending" + product.id}
                          cid={product.id}
                          ctext={product.name}
                          cbrand={product.brand}
                          cprice={product.price}
                          src={product.image}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="display-3">No pending ads</p>
                )}
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="row my-5">
                {this.state.rejected.length > 0 ? (
                  <div className="d-flex flex-row flex-wrap row overflow-auto">
                    {this.state.rejected.map((product) => (
                      <div className="col-3">
                        <SingleProduct
                          key={"rejected" + product.id}
                          cid={product.id}
                          ctext={product.name}
                          cbrand={product.brand}
                          cprice={product.price}
                          src={product.image}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="display-3">No rejected ads</p>
                )}
              </div>
            </TabPane>
          </TabContent>
          <CreateAdModal
            show={this.state.createModal}
            toggle={this.toggleCreateModal}
            getAds={this.getAdvertisements}
          />
        </div>
      )
    );
  }
}

export default Advertisements;

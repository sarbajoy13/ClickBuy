import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actionsTypes from "../../store/actions/actionTypes";
import api from "../../routes/api";
import SingleProduct from "../Home/Products/SingleProduct/SingleProduct";
import UpdateProduct from "../Advertisements/UpdateProduct";
import ChatModal from "./ChatModal";
class ProductDetails extends Component {
  state = {
    data: null,
    selectedImg: "",
    selectedIndex: -1,
    categoryProducts: [],
    user: JSON.parse(localStorage.getItem("user")),
    images: [],
    showUpdatePrdt: false,
    showChatModal: false,
  };

  toggleUpdatePrdt = () => {
    this.setState((pS, props) => {
      return {
        showUpdatePrdt: !pS.showUpdatePrdt,
      };
    });
  };
  toggleChatModal = () => {
    this.setState((pS, props) => {
      return {
        showChatModal: !pS.showChatModal,
      };
    });
  };
  getProductsByCategory = async (category) => {
    const url = api.developmentServer + "/api/products/" + category;
    await axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType) {
          console.log("Products by category: ", res.data);
          this.setState({ categoryProducts: res.data.results });
        }
      })
      .catch((err) => console.log(err));
  };

  getProductDetails = async () => {
    const url =
      api.developmentServer + "/api/product/" + this.props.match.params.id;
    await axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log("Single Product: ", res.data);
        this.setState({ data: res.data.result.product });
        this.getProductsByCategory(res.data.result.product.category);
        let blob = new Blob([new Uint8Array(res.data.result.product.image)], {
          type: "image/jpeg",
        });
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          selectedImg: imageUrl,
          images: res.data.result.images.map((image) => {
            let blob = new Blob([new Uint8Array(image.image)], {
              type: "image/jpeg",
            });
            return URL.createObjectURL(blob);
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  componentWillMount() {
    if (!this.state.user) {
      this.props.history.replace("/login");
    } else {
      this.getProductDetails();
    }
  }
  componentDidUpdate() {
    if (this.state.data && this.state.data.id != this.props.match.params.id) {
      this.getProductDetails();
    }
  }

  render() {
    return (
      this.state.user &&
      this.state.data && (
        <div className="container-lg pt-5 my-5">
          <div className="row">
            <div className="col-md-4 col-sm-10">
              <div className="d-flex justify-content-center">
                <img
                  src={this.state.selectedImg}
                  className="w-100"
                  alt="previewimg"
                />
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div className="d-flex flex-column">
                <h1 className="display-4 mb-2">{this.state.data.name}</h1>
                <h3
                  style={{
                    fontSize: "24px",
                  }}
                >
                  {this.state.data.brand}
                </h3>
                <p
                  style={{
                    fontSize: "20px",
                  }}
                  className="mb-4 text-danger"
                >
                  Amount: ${this.state.data.price}
                </p>
                <h3
                  style={{
                    fontSize: "24px",
                  }}
                >
                  Description:{" "}
                </h3>
                <p
                  style={{
                    //fontSize: "24px"
                    color: "gray",
                  }}
                  className="mb-4"
                >
                  {this.state.data.description}
                </p>
                {this.state.data.old && (
                  <div>
                    <h3
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      Type : {this.state.data.old ? "Old" : "New"}
                    </h3>
                    <h3
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      Used Year : {this.state.data.usedyr}
                    </h3>
                    <h3
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      Condition : {this.state.data.condi}
                    </h3>
                    <h3
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      Negotiable : {this.state.data.negotiable ? "Yes" : "No"}
                    </h3>
                  </div>
                )}
                <p
                  style={{
                    fontSize: "20px",
                  }}
                  className="mb-4 text-primary"
                >
                  Location: {this.state.data.loc}
                </p>
                <div className="d-flex flex-row">
                  {this.state.images.map((photo, index) => (
                    <img
                      src={photo}
                      key={"previewimg" + index}
                      alt="smallimg"
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "10px",
                        border:
                          this.state.selectedIndex === index
                            ? "2px solid gray"
                            : "white",
                        padding:
                          this.state.selectedIndex === index ? "3px" : "0px",
                      }}
                      className="mx-2"
                      onClick={() =>
                        this.setState({
                          selectedImg: photo,
                          selectedIndex: index,
                        })
                      }
                    />
                  ))}
                </div>
                <div className="my-4">
                  {this.state.user.id === this.state.data.createdby ? (
                    <button
                      className="btn btn-primary"
                      onClick={this.toggleUpdatePrdt}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => this.props.addToCheckout(this.state.data)}
                    >
                      Add to Cart
                    </button>
                  )}
                  {this.state.user.id !== this.state.data.createdby &&
                  this.state.data.donation === false ? (
                    <button
                      className="btn btn-success mx-2"
                      onClick={this.toggleChatModal}
                    >
                      Chat With Seller
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {this.state.categoryProducts.length > 1 ? (
            <div className="row my-5">
              <h1>People who bought this also bought</h1>
              <div className="d-flex flex-row row overflow-auto">
                {this.state.categoryProducts.map(
                  (product) =>
                    product.id !== this.state.data.id && (
                      <div className="col-3">
                        <SingleProduct
                          key={product.id}
                          cid={product.id}
                          src={product.image}
                          ctext={product.name}
                          cbrand={product.brand}
                          cprice={product.price}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          ) : null}
          <UpdateProduct
            show={this.state.showUpdatePrdt}
            toggle={this.toggleUpdatePrdt}
            data={this.state.data}
          />
          <ChatModal
            show={this.state.showChatModal}
            toggle={this.toggleChatModal}
            seller={this.state.data.createdby}
          />
        </div>
      )
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    addToCheckout: (data) =>
      dispatch({ type: actionsTypes.ADD_TO_CHECKOUT, data: data }),
  };
};

export default connect(null, mapDispatchtoProps)(ProductDetails);

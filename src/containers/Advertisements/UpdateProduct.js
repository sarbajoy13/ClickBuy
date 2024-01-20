import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../routes/api";
import { withRouter } from "react-router";

class UpdateProduct extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    name: this.props.data.name,
    brand: this.props.data.brand,
    description: this.props.data.description,
    usedyr: this.props.data.usedyr,
    category: this.props.data.category,
    old: this.props.data.old,
    condi: this.props.data.condi,
    donation: this.props.data.donation,
    price: this.props.data.price,
    negotiable: this.props.data.negotiable,
    loc: this.props.data.loc,
    photos: [],
    photo: null,
  };
  resetFields = () => {
    this.setState({
      name: "",
      brand: "",
      description: "",
      donation: "",
      price: "",
      category: "",
      old: false,
      usedyr: "",
      condi: "",
      negotiable: false,
      loc: "",
      photos: [],
      photo: null,
    });
  };
  addImageToProduct = async (id) => {
    const fd = new FormData();
    for (let x = 0; x < this.state.photos.length; x++) {
      fd.append("files", this.state.photos[x]);
    }
    //fd.append("file", this.state.fields.photos);
    //console.log(this.state.photos);
    const url =
      api.developmentServer + "/update/product/" + id + "/assign-image";
    await axios
      .post(url, fd, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  updateAd = async () => {
    const body = {
      id: this.props.data.id,
      name: this.state.name,
      brand: this.state.brand,
      description: this.state.description,
      usedyr: this.state.usedyr - "0",
      category: this.state.category,
      old: this.state.old,
      condi: this.state.condi,
      donation: this.state.donation,
      price: this.state.price - "0",
      negotiable: this.state.negotiable,
      loc: this.state.loc,
      createdby: this.state.user.id,
    };
    console.log(body);
    await axios
      .post(api.developmentServer + "/update/product", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log(res.data);
        //this.addImageToProduct(res.data.result.id);
        this.resetFields();
        toast.success("Product Updated");
        this.props.history.push("/ads");
      })
      .catch((err) => console.log(err));
    this.props.toggle();
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Update Advertisement
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column py-3">
            <div className="my-2">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="form-control"
                value={this.state.brand}
                onChange={(e) => {
                  this.setState({ brand: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                style={{
                  resize: "none",
                }}
                className="form-control"
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
                value={this.state.price}
                onChange={(e) => {
                  this.setState({ price: e.target.value });
                }}
              />
            </div>
            <div className="my-2">
              <label htmlFor="category">Category</label>
              <select
                type="text"
                name="category"
                id="category"
                className="form-control"
                value={this.state.category}
                onChange={(e) => {
                  this.setState({ category: e.target.value });
                }}
              >
                <option value="" disabled selected></option>
                <option value="electronics">Electronic Appliances</option>
                <option value="clothing">Clothes</option>
                <option value="accessories">Home Accessories</option>
              </select>
            </div>
            <div className="my-2">
              <span>Is this an used product?</span>
              <div className="d-flex flex-row mt-2">
                <div className="mx-2">
                  <input
                    type="radio"
                    name="old"
                    id="oldyes"
                    checked={this.state.old}
                    onChange={(e) => {
                      this.setState({ old: true });
                    }}
                  />{" "}
                  Yes
                </div>
                <div className="mx-2">
                  <input
                    type="radio"
                    name="old"
                    id="oldno"
                    checked={!this.state.old}
                    onChange={(e) => {
                      this.setState({ old: false });
                    }}
                  />{" "}
                  No
                </div>
              </div>
            </div>
            {this.state.old ? (
              <>
                <div className="my-2">
                  <label htmlFor="usedYears">
                    No. of years the product is used
                  </label>
                  <input
                    type="text"
                    name="usedYears"
                    id="usedYears"
                    className="form-control"
                    value={this.state.usedyr}
                    onChange={(e) => {
                      this.setState({ usedyr: e.target.value });
                    }}
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="condition">Condition</label>
                  <select
                    type="text"
                    name="condition"
                    id="condition"
                    className="form-control"
                    value={this.state.condi}
                    onChange={(e) => {
                      this.setState({ condi: e.target.value });
                    }}
                  >
                    <option value="" disabled selected></option>
                    <option value="new">As good as new</option>
                    <option value="good">Good</option>
                    <option value="moderate">Moderate</option>
                    <option value="rough">Used roughly</option>
                  </select>
                </div>
                <div className="my-2">
                  <span>Is the price negotiable?</span>
                  <div className="d-flex flex-row mt-2">
                    <div className="mx-2">
                      <input
                        type="radio"
                        name="negotiable"
                        id="negotiableyes"
                        checked={this.state.negotiable}
                        onChange={(e) => {
                          this.setState({ negotiable: true });
                        }}
                      />{" "}
                      Yes
                    </div>
                    <div className="mx-2">
                      <input
                        type="radio"
                        name="negotiable"
                        id="negotiableno"
                        checked={!this.state.negotiable}
                        onChange={(e) => {
                          this.setState({ negotiable: false });
                        }}
                      />{" "}
                      No
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            <div className="my-2">
              <label htmlFor="location">Location (City)</label>
              <input
                type="text"
                name="location"
                id="location"
                className="form-control"
                value={this.state.loc}
                onChange={(e) => {
                  this.setState({ loc: e.target.value });
                }}
              />
            </div>
            {/* <div className="my-2">
                            <label htmlFor="photos">
                                Upload photos of the product(min 1, max 7)
                            </label>
                            <input
                                type="file"
                                name="photos"
                                className="form-control"
                                id="photos"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files;
                                    const allfiles = [];
                                    for (let i = 0; i < files.length; i++) {
                                        allfiles.push(files[i]);
                                    }
                                    this.setState({
                                        photos: allfiles
                                    });
                                }}
                            />
                        </div> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-danger mx-1" onClick={this.props.toggle}>
              Cancel
            </button>
            <button className="btn btn-success mx-1" onClick={this.updateAd}>
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default withRouter(UpdateProduct);

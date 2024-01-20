import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../../routes/api";

class CreateAdModal extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    fields: {
      name: "",
      brand: "",
      description: "",
      price: "",
      category: "",
      old: false,
      usedYears: "",
      condition: "",
      negotiable: false,
      location: "",
      photos: [],
      photo: null,
    },
  };
  resetFields = () => {
    this.setState({
      fields: {
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        old: false,
        usedYears: "",
        condition: "",
        negotiable: false,
        location: "",
        photos: [],
        photo: null,
      },
    });
  };
  handleInput = (e) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };
  addImageToProduct = async (id) => {
    const fd = new FormData();
    for (let x = 0; x < this.state.fields.photos.length; x++) {
      fd.append("files", this.state.fields.photos[x]);
    }
    //fd.append("file", this.state.fields.photos);
    //console.log(this.state.photos);
    const url = api.developmentServer + "/api/product/" + id + "/assign-image";
    await axios
      .post(url, fd, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log(res.data);
        this.props.getAds();
      })
      .catch((err) => console.log(err));
  };
  createAd = async () => {
    const body = {
      name: this.state.fields.name,
      brand: this.state.fields.brand,
      description: this.state.fields.description,
      price: this.state.fields.price - "0",
      category: this.state.fields.category,
      //createddate: new Date(),
      createdby: this.state.user.id,
      old: this.state.fields.old,
      usedyr: this.state.fields.usedYears - "0",
      condi: this.state.fields.condition,
      negotiable: this.state.fields.negotiable,
      loc: this.state.fields.location,
    };
    await axios
      .post(api.developmentServer + "/api/product", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log(res.data);
        this.addImageToProduct(res.data.result.id);
        this.resetFields();
        toast.success("Product Created");
      })
      .catch((err) => console.log(err));
    this.props.toggle();
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Create Advertisement
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
                value={this.state.fields.name}
                onChange={this.handleInput}
              />
            </div>
            <div className="my-2">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="form-control"
                value={this.state.fields.brand}
                onChange={this.handleInput}
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
                value={this.state.fields.description}
                onChange={this.handleInput}
              />
            </div>
            <div className="my-2">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                className="form-control"
                value={this.state.fields.price}
                onChange={this.handleInput}
              />
            </div>
            <div className="my-2">
              <label htmlFor="category">Category</label>
              <select
                type="text"
                name="category"
                id="category"
                className="form-control"
                onChange={this.handleInput}
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
                    checked={this.state.fields.old}
                    onChange={(e) =>
                      this.setState({
                        fields: { ...this.state.fields, old: true },
                      })
                    }
                  />{" "}
                  Yes
                </div>
                <div className="mx-2">
                  <input
                    type="radio"
                    name="old"
                    id="oldno"
                    checked={!this.state.fields.old}
                    onChange={(e) =>
                      this.setState({
                        fields: { ...this.state.fields, old: false },
                      })
                    }
                  />{" "}
                  No
                </div>
              </div>
            </div>
            {this.state.fields.old ? (
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
                    value={this.state.fields.usedYears}
                    onChange={this.handleInput}
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="condition">Condition</label>
                  <select
                    type="text"
                    name="condition"
                    id="condition"
                    className="form-control"
                    onChange={this.handleInput}
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
                        checked={this.state.fields.negotiable}
                        onChange={(e) =>
                          this.setState({
                            fields: { ...this.state.fields, negotiable: true },
                          })
                        }
                      />{" "}
                      Yes
                    </div>
                    <div className="mx-2">
                      <input
                        type="radio"
                        name="negotiable"
                        id="negotiableno"
                        checked={!this.state.fields.negotiable}
                        onChange={(e) =>
                          this.setState({
                            fields: { ...this.state.fields, negotiable: false },
                          })
                        }
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
                value={this.state.fields.location}
                onChange={this.handleInput}
              />
            </div>
            <div className="my-2">
              <label htmlFor="photos">
                Upload photos of the product(min 1, max 7)
              </label>
              {/* <div className="d-flex flex-row my-2">
                {this.state.fields.photos.map((photo, index) => (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="smallimg"
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "10px",
                    }}
                    className="mx-2"
                  />
                ))}
              </div> */}
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
                    fields: { ...this.state.fields, photos: allfiles },
                  });
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-danger mx-1" onClick={this.props.toggle}>
              Cancel
            </button>
            <button className="btn btn-success mx-1" onClick={this.createAd}>
              Create
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateAdModal;

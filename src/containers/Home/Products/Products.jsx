import React, { Component } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct/SingleProduct";
import api from "../../../routes/api";

class Products extends Component {
  state = { products: [] };

  getProductsByCategory = async () => {
    const url = api.developmentServer + "/api/products/" + this.props.category;
    await axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.responseType) {
          this.setState({ products: res.data.results });
        }
      })
      .catch((err) => console.log(err));
  };
  componentWillMount() {
    this.getProductsByCategory();
  }
  render() {
    return (
      <div className="d-flex flex-row row overflow-auto">
        {this.state.products.length > 0 ? (
          this.props.category === "electronics" ? (
            <h2 className="mt-5 mb-2 text-start">Electronic Appliances</h2>
          ) : this.props.category === "clothing" ? (
            <h2 className="mt-5 mb-2 text-start">Clothes for Men and Women</h2>
          ) : this.props.category === "accessories" ? (
            <h2 className="mt-5 mb-2 text-start">Home Accessories</h2>
          ) : null
        ) : null}
        {this.state.products.map((product) => (
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
        ))}
      </div>
    );
  }
}

export default Products;

import React, { Component } from "react";
import axios from "axios";
import PendingSingleProduct from "./PendingSingleProduct";
import api from "../../../routes/api";

class PendingProducts extends Component {
  state = { products: [] };
  getPendingProducts = async () => {
    await axios
      .get(api.developmentServer + "/pendingProducts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log("Products: ", res.data);
        this.setState({
          products: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  };
  componentWillMount() {
    this.getPendingProducts();
  }
  render() {
    return this.state.products.length > 0 ? (
      <div className="">
        <h3> Products to be approved </h3>
        <div className="d-flex flex-row row overflow-auto">
          {this.state.products.map((product) => (
            <div className="col-3">
              <PendingSingleProduct
                key={product.id}
                cid={product.id}
                ctext={product.name}
                cbrand={product.brand}
                cprice={product.price}
                src={product.image}
              />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <h2>No products pending</h2>
    );
  }
}

export default PendingProducts;

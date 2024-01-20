import React, { Component } from "react";
import axios from "axios";
import SingleProduct from "./SingleProduct/SingleProduct";

class Products extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        {this.props.products.map((product) => (
          <SingleProduct
            key={product.id}
            src={product.image}
            ctext={product.name}
            cbrand={product.brand}
            cprice={product.price}
          />
        ))}
      </div>
    );
  }
}

export default Products;

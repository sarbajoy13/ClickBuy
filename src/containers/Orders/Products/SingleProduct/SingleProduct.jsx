import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import api from "../../../../routes/api";
import axios from "axios";

const SingleProduct = (props) => {
  const [imageUrl, setImage] = useState("");
  const [product, setProduct] = useState(null);

  const getProductDetails = async () => {
    const url = api.developmentServer + "/api/product/" + props.pid;
    await axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log("Single Product: ", res.data);
        setProduct(res.data.result.product);
        let blob = new Blob([new Uint8Array(res.data.result.product.image)], {
          type: "image/jpeg",
        });
        setImage(URL.createObjectURL(blob));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    return getProductDetails();
  }, []);
  return (
    product && (
      <div
        className="d-flex flex-column mx-1 my-2 w-100 rounded shadow"
        style={{
          backgroundColor: "lightgray",
          cursor: "pointer",
        }}
        onClick={() => props.history.push("/product/" + product.id)}
      >
        {imageUrl !== undefined ? (
          <img
            className="w-100 rounded"
            //width={250}
            height={150}
            src={imageUrl}
            alt="productimg"
          />
        ) : null}
        <div className="p-2">
          <p className="lead cloth-text px-2">{product.name}</p>
          <p className="font-weight-bold cloth-brand px-2">{product.brand}</p>
          <p className="text-danger cloth-price px-2">
            Price: ${product.price}
          </p>
        </div>
      </div>
    )
  );
};

export default withRouter(SingleProduct);

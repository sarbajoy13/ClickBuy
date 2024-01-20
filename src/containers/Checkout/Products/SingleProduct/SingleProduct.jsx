import React from "react";

const SingleProduct = (props) => {
  var blob = new Blob([new Uint8Array(props.src)], { type: "image/jpeg" });
  var imageUrl = URL.createObjectURL(blob);
  return (
    <div
      className="d-flex flex-row justify-content-between my-2 p-2"
      style={{
        backgroundColor: "#F5F5F5",
        maxHeight: "200px",
        borderRadius: "20px",
        borderBottom: "4px solid lightgray",
      }}
    >
      <div
        style={{
          width: "30%",
        }}
      >
        <img
          className="w-100 h-100"
          style={{
            borderRadius: "10px",
          }}
          src={imageUrl}
          alt="productimg"
        />
      </div>
      <div
        className="ml-2"
        style={{
          width: "60%",
        }}
      >
        <p className="lead cloth-text">{props.ctext}</p>
        <p className="font-weight-bold cloth-brand">{props.cbrand}</p>
        <p className="text-danger cloth-price">Price: ${props.cprice}</p>
      </div>
    </div>
  );
};

export default SingleProduct;

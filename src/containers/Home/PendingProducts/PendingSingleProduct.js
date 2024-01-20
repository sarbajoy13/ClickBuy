import React from "react";
import { withRouter } from "react-router-dom";

const PendingSingleProduct = (props) => {
  var blob = new Blob([new Uint8Array(props.src)], { type: "image/jpeg" });
  var imageUrl = URL.createObjectURL(blob);
  return (
    <div
      className="d-flex flex-column mx-1 my-2 w-100 rounded shadow"
      style={{
        backgroundColor: "lightgray",
        cursor: "pointer",
      }}
      onClick={() => props.history.push("/pendingproduct/" + props.cid)}
    >
      {props.src !== undefined ? (
        <img
          className="w-100 rounded"
          //width={250}
          height={150}
          src={imageUrl}
          alt="productimg"
        />
      ) : null}
      <div className="p-2">
        <p className="lead cloth-text px-2">{props.ctext}</p>
        <p className="font-weight-bold cloth-brand px-2">{props.cbrand}</p>
        <p className="text-danger cloth-price px-2">Price: ${props.cprice}</p>
      </div>
    </div>
  );
};

export default withRouter(PendingSingleProduct);

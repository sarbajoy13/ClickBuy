import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="pt-5 d-flex px-2"
      style={{
        height: "d-flex flex-row row overflow-auto",
        background: "rgb(2,0,36)",
        background:
          "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,113,121,1) 35%, rgba(0,212,255,1) 100%)",
        width: "100vw",
      }}
    >
      <div className="d-flex flex-row my-auto mx-auto justify-content-between align-items-center">
        <div className="">
          <p
            className="text-white text-center"
            style={{
              fontSize: "44px" ,marginLeft:"100px",
            }}
          >
            Buy anything Online with ClickBuy
          </p>
          <p
            className="text-white text-center"
            style={{
              fontSize: "28px", marginLeft:"100px",
            }}
          >
            ClickBuy: Just Click & Buy | Available {" "}
            <span className="text-danger font-weight-bold">GLOBALLY</span>
          </p>
          <div className="d-flex flex-row justify-content-center" style={{marginLeft:"100px"}}>
            <Link to="/signup">
              <button className="btn btn-lg btn-success mx-1">
                Join now!!
              </button>
            </Link>
            <Link to="/login">
              <button className="btn btn-lg btn-light text-primary px-3 mx-1">
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="">
          <div className="w-100">
            <img className="w-75 h-50" src="/ecartimage.png" alt="landing image" style={{marginLeft:"200px"}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
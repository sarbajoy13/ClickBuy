import React from "react";
import { Link } from "react-router-dom";


const Aboutus = () => {
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
              fontSize: "56px", marginTop:"50px",
            }}
          >
            About us
            <img src="about.png" height="50px" width="100px"/>

          </p>
          <p
            className="text-black font-weight-bold text-center offset-lg-1"
            style={{
              fontSize: "18px",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.ssssssssssssss<br />
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s<br />
            ,when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br />
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.<br />
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, <br />
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br />
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin <br />
            literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney <br />
            College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going<br /> 
            through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections <br />
            through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections <br />


          </p>

          
        </div>
        <div className="">
          <div className="w-100">
            <img className="w-75" src="/abou.png" alt="landing image" style={{marginLeft:"44px"}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {toast} from "react-toastify";
import styles from './contact.css';

const Contactus = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qex9f0l",
        "template_2su4h3l",
        e.target,
        "atoYFGfSmG82Qpxi0"
      )
      .then((response) => {
        console.log('Message sent sussessfully',response.status,response.text)
        toast.success("Message sent sussessfully")
      })
      .catch((err) =>{
        console.log('Fail')
      })
    }

       

  return (
     <div
      className="pt-5 d-flex px-2"
      style={{
        height: "100vh",
        background: "rgb(2,0,36)",
        background:
          "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,113,121,1) 35%, rgba(0,212,255,1) 100%)",
        width: "100vw",
      }}
      >
      <div className="d-flex flex-row my-auto mx-auto justify-content-between align-items-center">
        <div className="">
          <p
            className="text-white text-center " 
            style={{
              fontSize: "44px" , marginTop:"30px",
            }}
          >
            Contact Us   
            <img src="mail.png" height="50px" width="50px"/>
          </p>
          <p
            className="text-white text-center"
            style={{
              fontSize: "28px",
            }}
          >
                Connect With Us {" "}
            <span className="text-danger font-weight-bold">ClickBuy</span>
          </p>
      <div className="d-flex flex-row offset-lg-1">

      <form className="row" style={{ magin:"25px 15px 75px 100px",}} ref={form} onSubmit={sendEmail}>
        
        <label className="text-dark font-weight-bold">Name</label>
        
        <input type="text" placeholder="Your Name" name="name"  className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-5 shadow outline-none focus:outline-none focus:ring w-full"
          required/>
        
        <label className="text-dark font-weight-bold">Email</label>
        
        <input type="email" placeholder="Your Email" name="email"  className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-5 shadow outline-none focus:outline-none focus:ring w-full"
          required />
        
        <label className="text-dark font-weight-bold">Message</label>
        
        <textarea name="message" placeholder="Your Message"  className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-5 shadow outline-none focus:outline-none focus:ring w-full"
          required />
        <input type="submit" value="Send"  className={"px-3 py-3 placeholder-white text-white relative bg-blue bg-black rounded text-sm border-4 shadow outline-none focus:outline-none focus:ring w-full"
          + styles.contact } style={{ marginTop:"25px" }}  />
      </form>
      <div className="align-items-left">
          <div className="w-100">
            <img className="w-75" src="/abou.png" alt="landing image" style={{marginLeft:"40px"}}/>
          </div>
      </div>
      </div>
      </div>
    </div>
    
    </div>
  );
};

export default Contactus;

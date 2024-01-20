import React, { Component } from "react";
import Products from "./Products/Products";
import PaymentModal from "../Payment/PaymentModal";
import { connect } from "react-redux";
import { InputGroupText } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../routes/api";
import * as actionTypes from '../../store/actions/actionTypes';
class Checkout extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    createPaymentModal: false,
  };
  toggleCreatePaymentModal = () => {
    this.setState((pS, props) => {
      return {
        createPaymentModal: !pS.createPaymentModal,
      };
    });
  };
  handleClick=() =>
  {
      let cnt=0;
      for(let i=0;i<this.props.items.length;i++)
      {
        if(this.props.items[i].donation===true)
        {
          cnt=cnt+1;
        }
      }
      if(this.props.items.length===0)
      {
        toast.warning("No product added to cart");
      }
      else if(cnt===this.props.items.length)
      {
        const url=api.developmentServer + "/place-donation-order";
        const body={
          buyerid: this.state.user.id,
          prdtids: this.props.items.map((item) => item.id),
        }
        axios.post(url,body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }).then((res) => {
          if (res.data.responseType) {
            this.props.clearCheckout();
              toast.success("Order Placed");
          }
        }).catch((err) => console.log(err));
      }
      else{
        this.toggleCreatePaymentModal();
      }
  }
  render() {
    let totalPrice = 0;
    this.props.items.map((item) => (totalPrice += item.price - "0"));
    return (
      <div className="pt-5 my-5 container-lg">
        <div>
          <p className="display-4 text-start">Checkout</p>
          <p className="lead text-start">
            Total Items: {this.props.items.length}
          </p>
        </div>
        <div className="row">
          <div className="col-md-7">
            {this.props.items.length > 0 ? (
              <Products products={this.props.items} />
            ) : (
              <h1>No items added to Cart</h1>
            )}
          </div>
          <div className="col-md-5">
            <div
              className="my-2 px-3 py-3"
              style={{
                backgroundColor: "#F5F5F5",
                height: "200px",
              }}
            >
              <p
                className="my-3"
                style={{
                  fontSize: "28px",
                }}
              >
                Order Summary
              </p>
              <p
                className="my-3"
                style={{
                  fontSize: "20px",
                }}
              >
                Amount: ${totalPrice}
              </p>
              <button
                className="btn btn-success"
                onClick={this.handleClick}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <PaymentModal
          show={this.state.createPaymentModal}
          toggle={this.toggleCreatePaymentModal}
          totalPrice={totalPrice}
        />
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    items: state.checkout.items,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    clearCheckout: () => dispatch({ type: actionTypes.CLEAR_CHECKOUT }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout);

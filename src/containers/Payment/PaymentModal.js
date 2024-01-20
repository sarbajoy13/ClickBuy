import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import RatingAndFeedbackModal from "../RatingAndFeedback/RatingAndFeedbackModal";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import api from "../../routes/api";
import * as actionTypes from "../../store/actions/actionTypes";

class PaymentModal extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    createRatingAndFeedbackModal: false,
    buyerId: "",
    price: "",
    cardNo: "",
    cardHolder: "",
    cvv: "",
    msg: "",
    orderid: 0,
  };
  toggleRRatingAndFeedbackModal = () => {
    this.setState((pS, props) => {
      return {
        createRatingAndFeedbackModal: !pS.createRatingAndFeedbackModal,
      };
    });
  };
  doPayment = (e) => {
    e.preventDefault();
    if (this.state.cardNo.length !== 16 || this.state.cvv.length !== 3) {
      this.setState({ msg: "check card no or cvv" });
    } else {
      const body = {
        buyerid: this.state.user.id,
        prdtids: this.props.items.map((item) => item.id),
        price: this.props.totalPrice,
        buyercardno: this.state.cardNo,
      };
      console.log(body);
      axios
        .post(api.developmentServer + "/placeOrder", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          if (res.data.responseType) {
            this.setState({ orderid: res.data.result.id }, () => {
              this.props.clearCheckout();
              this.props.toggle();
              toast.success("Order Placed");
              this.toggleRRatingAndFeedbackModal();
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <div>
        <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            <h3>Card Details</h3>
            <h4 className="text-danger">{this.state.msg}</h4>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex flex-column py-3">
              <div className="my-2">
                <label htmlFor="cardNo">Card No</label>
                <input
                  type="number"
                  name="cardNo"
                  className="form-control"
                  value={this.state.cardNo}
                  placeholder="16 digit card no"
                  onChange={(e) => {
                    this.setState({ cardNo: e.target.value, msg: "" });
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="cardHolder">Holder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  className="form-control"
                  value={this.state.cardHolder}
                  placeholder="card holder name"
                  onChange={(e) => {
                    this.setState({ cardHolder: e.target.value, msg: "" });
                  }}
                />
              </div>
              <div className="my-2">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="number"
                  name="cvv"
                  className="form-control"
                  value={this.state.cvv}
                  placeholder="3 digit cvv"
                  onChange={(e) => {
                    this.setState({ cvv: e.target.value, msg: "" });
                  }}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex flex-row justify-content-center">
              <button
                className="btn btn-danger mx-1"
                onClick={this.props.toggle}
              >
                Cancel
              </button>
              <button className="btn btn-success mx-1" onClick={this.doPayment}>
                Pay
              </button>
            </div>
          </ModalFooter>
        </Modal>
        <RatingAndFeedbackModal
          show={this.state.createRatingAndFeedbackModal}
          toggle={this.toggleRRatingAndFeedbackModal}
          orderId={this.state.orderid}
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

export default connect(mapStatetoProps, mapDispatchtoProps)(PaymentModal);

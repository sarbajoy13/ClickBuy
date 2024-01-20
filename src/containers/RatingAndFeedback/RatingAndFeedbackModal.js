import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../routes/api";
class RatingAndFeedbackModal extends Component {
  state = {
    rating: "",
    feedback: "",
  };
  giveRatingAndFeedback = (e) => {
    e.preventDefault();
    const body = {
      orderid: this.props.orderId,
      rating: this.state.rating,
      feedback: this.state.feedback,
    };
    console.log(body);
    axios
      .post(api.developmentServer + "/rateOrder", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => console.log(err));
    this.props.toggle();
  };
  render() {
    return (
      <Modal size="lg" isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          <h3>Rate Our Service</h3>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column py-3">
            <div className="my-2">
              <span>Rate Order</span>
              <div className="d-flex flex-row mt-2">
                <div className="mx-2">
                  <input
                    type="radio"
                    name="rating"
                    onChange={(e) => this.setState({ rating: 1 })}
                  />{" "}
                  1
                </div>
                <div className="mx-2">
                  <input
                    type="radio"
                    name="rating"
                    onChange={(e) => this.setState({ rating: 2 })}
                  />{" "}
                  2
                </div>
                <div className="mx-2">
                  <input
                    type="radio"
                    name="rating"
                    onChange={(e) => this.setState({ rating: 3 })}
                  />{" "}
                  3
                </div>
                <div className="mx-2">
                  <input
                    type="radio"
                    name="rating"
                    onChange={(e) => this.setState({ rating: 4 })}
                  />{" "}
                  4
                </div>
                <div className="mx-2">
                  <input
                    type="radio"
                    name="rating"
                    onChange={(e) => this.setState({ rating: 5 })}
                  />{" "}
                  5
                </div>
              </div>
            </div>
            <div className="my-2">
              <label htmlFor="feedback">Feedback</label>
              <input
                type="text"
                name="feedback"
                className="form-control"
                value={this.state.feedback}
                onChange={(e) => {
                  this.setState({ feedback: e.target.value });
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-danger mx-1" onClick={this.props.toggle}>
              Cancel
            </button>
            <button
              className="btn btn-success mx-1"
              onClick={this.giveRatingAndFeedback}
            >
              Submit
            </button>
          </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default RatingAndFeedbackModal;

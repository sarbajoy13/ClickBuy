import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import api from "../../routes/api";
import axios from "axios";
import Products from "./Products/Products";

class Orders extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    opened: [],
    orders: [],
  };
  getAllOrders = async () => {
    const url = api.developmentServer + "/api/orders/" + this.state.user.id;
    await axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log("Orders: ", res.data);
        if (res.data.responseType) {
          this.setState({
            orders: res.data.results,
            opened: res.data.results.map((o) => false),
          });
        }
      });
  };
  toggle = (index) => {
    const opened = this.state.opened;
    opened[index] = !opened[index];
    this.setState({ opened: opened });
  };
  componentWillMount() {
    if (this.state.user) {
      this.getAllOrders();
    } else {
      this.props.history.replace("/login");
    }
  }
  render() {
    return (
      <div className="container-lg my-5">
        {this.state.orders.length > 0 ? (
          <div className="row mt-5">
            <h1 className="mt-5 mb-4">Your Orders</h1>
            {this.state.orders.map((order, index) => (
              <div className="col-12 my-2">
                <div
                  className="d-flex flex-row px-4 py-3 justify-content-between border rounded shadow"
                  onClick={() => this.toggle(index)}
                >
                  <p className="lead">
                    {index + 1}. Order {index + 1}
                  </p>
                  <p className="lead">Price: ${order.price}</p>
                </div>
                <Collapse isOpen={this.state.opened[index]}>
                  <Card>
                    <CardBody>
                      <Products products={order.prdtids} />
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            ))}
          </div>
        ) : (
          <div className="row mt-5">
            <h1 className="mt-5 mb-4">No orders yet</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Orders;

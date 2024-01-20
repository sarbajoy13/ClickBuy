import axios from "axios";
import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import api from "../../routes/api";
export class Revenue extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    week: "",
    month: "",
    year: "",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          borderColor: "",
          data: [],
        },
      ],
    },
  };

  getWeekRevenue = () => {
    this.setState({ week: "btn-primary", month: "", year: "" });
    const url = api.developmentServer + "/week-revenue/" + this.state.user.id;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType) {
          this.setState({
            data: {
              labels: res.data.result.listofdates,
              datasets: [
                {
                  label: res.data.message,
                  borderColor: "blue",
                  data: res.data.result.noofsell,
                  borderWidth: 1,
                  fill: "start",
                  backgroundColor: "rgba(211,211,211,0.3)",
                },
              ],
            },
          });
        }
      });
  };

  getMonthRevenue = () => {
    this.setState({ week: "", month: "btn-primary", year: "" });
    const url = api.developmentServer + "/month-revenue/" + this.state.user.id;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType) {
          this.setState({
            data: {
              labels: res.data.result.listofdates,
              datasets: [
                {
                  label: res.data.message,
                  borderColor: "blue",
                  data: res.data.result.noofsell,
                  borderWidth: 1,
                  fill: "start",
                  backgroundColor: "rgba(211,211,211,0.3)",
                },
              ],
            },
          });
        }
      });
  };

  getYearRevenue = () => {
    this.setState({ week: "", month: "", year: "btn-primary" });
    const url = api.developmentServer + "/year-revenue/" + this.state.user.id;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType) {
          this.setState({
            data: {
              labels: res.data.result.listofdates,
              datasets: [
                {
                  label: res.data.message,
                  borderColor: "blue",
                  data: res.data.result.noofsell,
                  borderWidth: 1,
                  fill: "start",
                  backgroundColor: "rgba(211,211,211,0.3)",
                },
              ],
            },
          });
        }
      });
  };

  componentWillMount() {
    if (this.state.user) {
      this.getWeekRevenue();
    } else {
      this.props.history.replace("/login");
    }
  }
  render() {
    let options = {
      scales: {
        x: {
          color: "black",
          grid: {
            color: "rgba(0,0,0,0.2)",
          },
        },
        y: {
          color: "black",
          ticks: {
            min: 0,
            stepSize: 1,
          },
          grid: {
            color: "rgba(0,0,0,0.2)",
          },
        },
      },
    };
    return (
      <div className="container mb-5">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-center">Your Sell Revenue</h1>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-start mb-3 mt-2">
            <button
              onClick={this.getWeekRevenue}
              className={"btn mx-1 " + this.state.week}
            >
              1W
            </button>{" "}
            <button
              onClick={this.getMonthRevenue}
              className={"btn mx-1 " + this.state.month}
            >
              1M
            </button>{" "}
            <button
              onClick={this.getYearRevenue}
              className={"btn mx-1 " + this.state.year}
            >
              1Y
            </button>
          </div>
          <div>
            <Line
              data={this.state.data}
              options={options}
              className="card-body shadow rounded"
            />
          </div>
        </div>
        {/* <br />
        <div className="text-center">
          <button onClick={this.getWeekRevenue} className={this.state.week}>
            Last 7 Days Sell
          </button>{" "}
          <button onClick={this.getMonthRevenue} className={this.state.month}>
            Last 30 Days Sell
          </button>{" "}
          <button onClick={this.getYearRevenue} className={this.state.year}>
            Last 1 Year Sell
          </button>
        </div>
        <br /> */}
      </div>
    );
  }
}

export default Revenue;

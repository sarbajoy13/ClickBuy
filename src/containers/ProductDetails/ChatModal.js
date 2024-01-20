import axios from "axios";
import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import api from "../../routes/api";
class ChatModal extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    seller: "",
    chats: [],
    msg: "",
    anotherPerson: null,
  };
  sendMessage = () => {
    if (this.state.msg === "") {
    } else {
      const body = {
        sender: this.state.user.id,
        receiver: this.props.seller,
        content: this.state.msg,
      };
      this.setState({ msg: "" });
      axios
        .post(api.developmentServer + "/chat/send-message", body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((res) => {
          if (res.data.responseType === true) {
            this.getAllChats();
            this.mainInput.value = "";
          }
        })
        .catch((err) => console.log(err));
    }
  };
  getSellerDetail = async () => {
    axios
      .get(api.developmentServer + "/users/" + this.props.seller, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType) {
          console.log(res.data.result);
          this.setState({ seller: res.data.result });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getAllChats = async () => {
    const body = {
      id1: this.state.user.id,
      id2: this.props.seller,
    };
    axios
      .post(api.developmentServer + "/chat/get-all-chat", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        console.log("Chats: ", res.data);
        if (res.data.responseType) {
          this.setState({ chats: res.data.results, anotherPerson: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // componentDidUpdate(pP,pS,sS)
  // {
  //     if(pS.chats!==this.state.chats)
  //     {
  //         this.getAllChats();
  //     }
  // }
  componentWillMount() {
    if (!this.state.user) {
      this.props.history.replace("/login");
    } else if (this.props.seller !== 0) {
      this.getSellerDetail();
      this.getAllChats();
    }

    setInterval(() => {
      if (this.state.anotherPerson) {
        this.getAllChats();
      }
    }, 5000);
  }
  dateFormatUpdate = (datee) => {
    if (datee) {
      const month = datee.split("/")[1];
      const day = datee.split("/")[0];
      const year = datee.split("/")[2];
      return day + "-" + month + "-" + year;
    } else return "";
  };
  render() {
    let lastDate = null;
    const sellerchats = [];
    this.state.chats.map((chat) => {
      if (
        this.dateFormatUpdate(lastDate) !==
        this.dateFormatUpdate(chat.timestamp.split(" ")[0])
      ) {
        sellerchats.push(
          <div className="d-flex flex-row w-100 justify-content-center my-2 px-2">
            <p
              className="m-0 px-3 py-2"
              style={{
                borderRadius: "10px",
                maxWidth: "75%",
                backgroundColor: "#88E0EF",
              }}
            >
              {chat.timestamp.split(" ")[0]}
            </p>
          </div>
        );
      }
      if (chat.sender === this.state.user.id) {
        sellerchats.push(
          <div className="d-flex flex-row w-100 justify-content-end my-2 px-2">
            <p
              className="m-0 px-3 py-2 bg-white"
              style={{
                borderRadius: "10px",
                maxWidth: "75%",
              }}
            >
              {chat.content} <br />
              <div
                className="d-flex justify-content-end"
                style={{
                  fontSize: "12px",
                }}
              >
                {chat.timestamp.split(" ")[1]}
              </div>
            </p>
          </div>
        );
      } else {
        sellerchats.push(
          <div className="d-flex flex-row w-100 justify-content-start my-2 px-2">
            <p
              className="m-0 px-3 py-2 bg-primary text-white"
              style={{
                borderRadius: "10px",
                maxWidth: "75%",
              }}
            >
              {chat.content} <br />
              <span className="text-end">{chat.timestamp.split(" ")[1]}</span>
            </p>
          </div>
        );
      }
      lastDate = chat.timestamp.split(" ")[0];
    });
    return (
      <div>
        <Modal size="xl" isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle} className="bg-success">
            <h5 className="text-white">{this.state.seller.username}</h5>
          </ModalHeader>
          <ModalBody className="">
            <div
              className="w-100"
              style={{
                paddingLeft: "0px!important",
              }}
            >
              <div className="d-flex flex-column h-100 border">
                <div
                  className="d-flex flex-row align-items-center px-3 py-2"
                  style={{
                    backgroundColor: "lightgray",
                  }}
                >
                  <div className="bg-dark rounded-circle px-3 py-2">
                    <i className="fa fa-2x fa-user text-white"></i>
                  </div>
                  <div className="mx-3">
                    <p className="m-0 lead">
                      {this.state.seller.username
                        ? this.state.seller.username
                        : "No Name"}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex flex-column justify-content-start"
                  style={{
                    backgroundImage:
                      "url('http://localhost:3000/chatback.jpeg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    maxHeight: "65vh",
                    overflow: "scroll",
                  }}
                >
                  {this.state.chats.length > 0 ? (
                    sellerchats
                  ) : (
                    <div className="d-flex flex-row w-100 justify-content-center my-2 px-2">
                      <p className="m-0 px-3 py-2 lead">
                        You don't have any conversation yet
                      </p>
                    </div>
                  )}
                  {/* {this.state.chats.length > 0 ? (
                    this.state.chats.map((chat) => {
                      if (chat.sender === this.state.user.id) {
                        return (
                          <div className="d-flex flex-row w-100 justify-content-end my-2 px-2">
                            <p
                              className="m-0 px-3 py-2 bg-white"
                              style={{
                                borderRadius: "10px",
                                maxWidth: "75%",
                              }}
                            >
                              {chat.content} <br />
                              <div
                                className="d-flex justify-content-end"
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                {chat.timestamp.split(" ")[1]}
                              </div>
                            </p>
                          </div>
                        );
                      } else {
                        return (
                          <div className="d-flex flex-row w-100 justify-content-start my-2 px-2">
                            <p
                              className="m-0 px-3 py-2 bg-primary text-white"
                              style={{
                                borderRadius: "10px",
                                maxWidth: "75%",
                              }}
                            >
                              {chat.content} <br />
                              <span className="text-end">
                                {chat.timestamp.split(" ")[1]}
                              </span>
                            </p>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className="d-flex flex-row w-100 justify-content-center my-2 px-2">
                      <p className="m-0 px-3 py-2 lead">
                        You don't have any conversation yet
                      </p>
                    </div>
                  )} */}
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <div className="d-flex flex-row w-100 justify-content-around">
                    <div
                      style={{
                        width: "94%",
                      }}
                    >
                      <input
                        ref={(ref) => (this.mainInput = ref)}
                        placeholder="type your message here"
                        onChange={(e) => {
                          this.setState({ msg: e.target.value });
                        }}
                        className="border border-success form-control"
                      />
                    </div>
                    <div
                      style={{
                        width: "6%",
                      }}
                      className="d-flex justify-content-center"
                    >
                      <button
                        className="btn btn-success mx-auto"
                        onClick={this.sendMessage}
                        style={{
                          borderRadius: "50%",
                        }}
                      >
                        <i className="fa fa-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {this.state.chats.length > 0 ? (
              <div>
                {this.state.chats.map((chat) =>
                  chat.sender === this.state.user.id ? (
                    <div key={chat.id}>
                      <div>{chat.content}</div>
                      <div>{chat.timestamp}</div>
                    </div>
                  ) : (
                    <div key={chat.id}>
                      <div>{chat.content}</div>
                      <div>{chat.timestamp}</div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <h3 className="text-center">Start Your Conversation</h3>
            )}
            <div className="row">
              <input
                ref={(ref) => (this.mainInput = ref)}
                placeholder="type your message here"
                onChange={(e) => {
                  this.setState({ msg: e.target.value });
                }}
                className="col-10 border border-success"
              />
              <button
                className="col-2 btn btn-success border border-dark"
                onClick={this.sendMessage}
              >
                Send
              </button>
            </div> */}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default ChatModal;

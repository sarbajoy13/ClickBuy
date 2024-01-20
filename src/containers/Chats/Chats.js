import axios from "axios";
import React, { Component } from "react";
import api from "../../routes/api";

export class Chats extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    chatList: [],
    anotherPerson: null,
    allChats: [],
    msg: "",
    search: "",
  };
  sendMessage = () => {
    if (this.state.msg === "") {
    } else {
      const body = {
        sender: this.state.user.id,
        receiver: this.state.anotherPerson.userid,
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
            this.getChats();
            this.getChatList();
            this.mainInput.value = "";
          }
        })
        .catch((err) => console.log(err));
    }
  };
  getChatList = async () => {
    await axios
      .get(api.developmentServer + "/chat/list/" + this.state.user.id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType === true) {
          console.log("Chatlist: ", res.data);
          this.setState({ chatList: res.data.results });
        }
      });
  };
  getChats = async () => {
    const body = {
      id1: this.state.user.id,
      id2: this.state.anotherPerson.userid,
    };
    await axios
      .post(api.developmentServer + "/chat/get-all-chat", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        if (res.data.responseType) {
          console.log("Chats: ", res.data);
          this.setState({ allChats: res.data.results });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // componentDidUpdate(pP, pS, sS) {
  //   console.log(pS.allChats, this.state.allChats);
  //   // if (pS.allChats !== this.state.allChats) {
  //   //   this.getChats();
  //   // }
  //   // if (pS.chatList !== this.state.chatList) {
  //   //   this.getChatList();
  //   // }
  // }
  componentWillMount() {
    if (!this.state.user) {
      this.props.history.replace("/login");
    } else {
      this.getChatList();
    }
    setInterval(() => {
      if (this.state.anotherPerson) {
        this.getChats();
      }
      this.getChatList();
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
    this.state.allChats.map((chat) => {
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
      <div
        className="container-fluid"
        style={{
          marginTop: "10vh",
        }}
      >
        <div className="row no-gutter">
          <div className="col-4">
            <div className="d-flex flex-column">
              <div className="d-flex flex-row bg-secondary">
                <div className="m-3">
                  <p className="lead m-0 text-white">VLX Chats</p>
                </div>
                {/* <div className="d-flex flex-row">

                            </div> */}
              </div>
              <div
                className="d-flex justify-content-center"
                style={{
                  backgroundColor: "lightgray",
                }}
              >
                <div className="w-100 mx-3 my-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search chats"
                    style={{
                      borderRadius: "20px",
                    }}
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                  />
                </div>
              </div>
              <div
                className="d-flex flex-column justify-content-start border"
                style={{
                  height: "74vh",
                  overflow: "scroll",
                }}
              >
                {this.state.chatList.map(
                  (chatee) =>
                    (!chatee.name ||
                      chatee.name.includes(this.state.search)) && (
                      <div
                        className="d-flex flex-row boder border-bottom border-secondary py-3 px-2 align-items-center"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          this.setState(
                            { anotherPerson: chatee },
                            this.getChats
                          );
                        }}
                      >
                        <div className="bg-dark rounded-circle px-3 py-2">
                          <i className="fa fa-2x fa-user text-white"></i>
                        </div>
                        <div className="mx-3">
                          <p className="m-0 lead">
                            {chatee.name ? chatee.name : "No Name"}
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div
            className="col-8"
            style={{
              paddingLeft: "0px!important",
              height: "88vh",
            }}
          >
            {this.state.allChats.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 border">
                <div>
                  <i
                    className="fa fa-comments"
                    style={{
                      fontSize: "200px",
                    }}
                  ></i>
                </div>
                <div>
                  <h1>No Chats Selected</h1>
                </div>
              </div>
            ) : (
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
                      {this.state.anotherPerson.name
                        ? this.state.anotherPerson.name
                        : "No Name"}
                    </p>
                  </div>
                </div>
                <div
                  className="d-flex flex-column justify-content-start h-100 overflow-scroll"
                  style={{
                    backgroundImage:
                      "url('http://localhost:3000/chatback.jpeg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {this.state.allChats.length > 0 ? (
                    sellerchats
                  ) : (
                    <div className="d-flex flex-row w-100 justify-content-center my-2 px-2">
                      <p className="m-0 px-3 py-2 lead">
                        You don't have any conversation yet
                      </p>
                    </div>
                  )}
                  {/* {this.state.allChats.length > 0 ? (
                    this.state.allChats.map((chat) => {
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
            )}
          </div>
        </div>
      </div>
      //   <div>
      //     {this.state.user && this.state.chatList.length > 0 ? (
      //       <div className="row">
      //         <div className="col-4 mt-4">
      //           <br />
      //           <br />
      //           {this.state.chatList.map((chat, index) => (
      //             <div key={chat.id}>
      //               <div className="bg-secondary btn">
      //                 <button
      //                   className="btn"
      //                   onClick={() =>
      //                     this.setState(
      //                       { anotherPerson: this.state.chatList[index].userid },
      //                       this.getChats
      //                     )
      //                   }
      //                 >
      //                   {chat.name ? chat.name : "No Name"}
      //                 </button>
      //               </div>
      //             </div>
      //           ))}
      //         </div>
      //         <div className="col-8 bg-success">
      //           <br />
      //           <br />
      //           <br />
      //           <p>{this.state.anotherPerson.name}</p>
      //           {this.state.allChats.length > 0 ? (
      //             <div>
      //               {this.state.allChats.map((chats) => (
      //                 <div key={chats.id}>
      //                   <p>{chats.content}</p>
      //                   <p>{chats.timestamp}</p>
      //                 </div>
      //               ))}
      //               <div className="row">
      //                 <input
      //                   ref={(ref) => (this.mainInput = ref)}
      //                   placeholder="type your message here"
      //                   onChange={(e) => {
      //                     this.setState({ msg: e.target.value });
      //                   }}
      //                   className="col-10 border border-success"
      //                 />
      //                 <button
      //                   className="col-2 btn btn-success border border-dark"
      //                   onClick={this.sendMessage}
      //                 >
      //                   Send
      //                 </button>
      //               </div>
      //             </div>
      //           ) : (
      //             <div className="text-center">
      //               <br />
      //               <br />
      //               <br />
      //               <h3>Tap on the name in list to start chat</h3>
      //             </div>
      //           )}
      //         </div>
      //       </div>
      //     ) : (
      //       <div className="text-center">
      //         <br />
      //         <br />
      //         <br />
      //         <h3>You haven't Started any conversation yet</h3>
      //       </div>
      //     )}
      //   </div>
    );
  }
}

export default Chats;

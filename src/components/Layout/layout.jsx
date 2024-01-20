import React from "react";
import Header from "../Header/Header";

import { Switch, Route } from "react-router-dom";
import router from "../../routes/router";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

const Layout = (props) => {
  return (
    <div>
      <Header />
      {/* <LandingPage /> */}
      <Switch>
        {router.map((props, key) => {
          return (
            <Route
              exact
              path={props.path}
              key={key}
              component={props.component}
            />
          );
        })}
      </Switch>
      <ToastContainer />
    </div>
  );
};

export default Layout;

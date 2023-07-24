import React from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//style
import reportWebVitals from "./reportWebVitals";
import "./assets/css/bootstrap.min.css";
import "./assets/css/Agreement.css";
import "./assets/css/Login.css";
import "./assets/css/SignUP.css";

//import App from "./App";
import Agreement from "./views/Agreement";
import Login from "./views/Login";
import SignUP from "./views/SignUP";
import MainPage from "./views/MainPage";
import Header from "./components/Headers/Header";

//import Header from "./components/Headers/Page1Header";
import Page1Header from "./views/Page1Header";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/SignUP" component={SignUP} />
      <Route exact path="/Agreement" component={Agreement} />
      <Route path="/Header" component={Header} />
      <Route path="/Page1Header" component={Page1Header} />
      <Route path="/" component={MainPage} />
    </Switch>
  </BrowserRouter>
);

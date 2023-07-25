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
import "./assets/css/Header.css";
import "./assets/css/MainPage.css";
import "./assets/css/damnlist.css";

//import App from "./App";
import Agreement from "./views/Agreement";
import Login from "./views/Login";
import SignUP from "./views/SignUP";
import MainPage from "./views/MainPage";
import MainPageRecommend from "./views/MainPageRecommend";
import Header from "./components/Headers/Header";
import damnlist from "./views/damnlist";

//import Header from "./components/Headers/Page1Header";
import Page1Header from "./views/Page1Header";
import Page2Header from "./views/Page2Header";
import Page3Header from "./views/Page3Header";
import Page4Header from "./views/Page4Header";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/SignUP" component={SignUP} />
      <Route exact path="/Agreement" component={Agreement} />
      <Route path="/Header" component={Header} />
      <Route path="/Page1Header" component={Page1Header} />
      <Route path="/Page2Header" component={Page2Header} />
      <Route path="/Page3Header" component={Page3Header} />
      <Route path="/Page4Header" component={Page4Header} />
      <Route path="/" component={MainPage} />
      <Route exact path="/damnlist" component={damnlist} />
      <Route path="/MainPageRecommend" component={MainPageRecommend} />
    </Switch>
  </BrowserRouter>
);

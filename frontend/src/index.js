import React from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//style
import reportWebVitals from "./reportWebVitals";
import "./assets/css/bootstrap.min.css";
import "./assets/css/Agreement.css";
import "./assets/css/Login.css";
import "./assets/css/SignUP.css";
import "./assets/css/Header.css";
import "./assets/css/MainPage.css";
import "./assets/css/damnlist.css";
import "./assets/css/damnstory.css";
import "./assets/css/damnstorywrite.css";

//import App from "./App";
import Agreement from "./views/Agreement";
import Login from "./views/Login";
import SignUP from "./views/SignUP";
import MainPage from "./views/MainPage";
import MainPageRecommend from "./views/MainPageRecommend";
import Header from "./components/Headers/Header";
import damnlist from "./views/damnlist";
import damnlistBoard from "./views/damnlistBoard";
import damnstory from "./views/damnstory";
import damnstorywrite from "./views/damnstorywrite";
import damnprofile from "./views/damnprofile";
import DamnstoryDetail from "./views/damnstoryDetail";

//import Header from "./components/Headers/Page1Header";
import Page1Header from "./views/Page1Header";
import Page2Header from "./views/Page2Header";
import damnrank from "./views/damnrank";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/SignUP" component={SignUP} />
      <Route exact path="/Agreement" component={Agreement} />
      <Route exact path="/Header" component={Header} />
      <Route exact path="/Page1Header" component={Page1Header} />
      <Route exact path="/Page2Header" component={Page2Header} />
      <Route exact path="/damnrank" component={damnrank} />
      <Route exact path="/" component={MainPage} />
      <Route exact path="/damnlist" component={damnlist} />
      <Route exact path="/MainPageRecommend" component={MainPageRecommend} />
      <Route exact path="/damnlistBoard" component={damnlistBoard} />
      <Route exact path="/damnstory" component={damnstory} />
      <Route exact path="/damnstory/new" component={damnstorywrite} />
      <Route exact path="/damnstory/:storyid" component={DamnstoryDetail} />
      <Route exact path="/damnprofile" component={damnprofile}/>
    </Switch>
  </BrowserRouter>
);

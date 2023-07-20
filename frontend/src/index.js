import React from "react";
import { createRoot } from 'react-dom/client';

import { render } from 'react-dom';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

//style
import reportWebVitals from "./reportWebVitals";
import "./assets/css/bootstrap.min.css";
import "./assets/css/Agreement.css"
import "./assets/css/Login.css"
import "./assets/css/SignUP.css"



//import App from "./App";
import Agreement from "./views/Agreement";
import Login from "./views/Login";
import SignUP from "./views/SignUP";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/SignUP" component={SignUP} />
      <Route path="/Agreement" component={Agreement} />
    </Switch>
  </BrowserRouter>
);


// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/Login" exact component={Login}></Route>
//       <Route path="/SignUP" exact component={SignUP}></Route>
//       <Route Path="/Agreement" exact component={Agreement}></Route>
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );
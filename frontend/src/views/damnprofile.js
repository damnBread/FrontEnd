import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import "../assets/css/damnstoryprofile.css";
import Footer from "../components/Footers/Footer";

const damnprofile = () => {
    
    const sessionToken = sessionStorage.getItem('token');

    function token() {
      console.log("SSSSS: " + sessionToken);
    }

    return (
      <div className="damnprofilewhole">
        <Header />
        <div className="damnprofile">
            <div className="damnprofileleft" onClick={token()}>
              <h1>마이 페이지</h1>
            </div>

            <div className="damnprofileright">

            </div>
        </div>


      </div>
    );
  };

  export default damnprofile;
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
// import "../assets/css/damnlist.css";

const damnlist = () => {
  const linkStyle = {
    textDecoration: 'none', // Removes the underline
    color: 'black' // Sets the text color to black
  };

  return (
    <div>
      <Header/>
      <div className="daumlist">
        <p style={{ fontFamily: 'GmarketSans, sans-bold' }}>땜빵구해요</p>
      </div>
    </div>
  );
};

export default damnlist;

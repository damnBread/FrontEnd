import React from "react";
import { Link } from "react-router-dom";
import MainPageImg1 from "../assets/img/MainPageImg1.png";
import MainPageImg2 from "../assets/img/MainPageImg2.png";
import MainPageImg3 from "../assets/img/MainPageImg3.png";
import MainPageImg4 from "../assets/img/MainPageImg4.png";
import "../assets/css/MainPage.css";
import { Container } from "react-bootstrap";

const MainPageRecommend = () => {

  const linkStyle = {
    textDecoration: 'none', // Removes the underline
    color: 'black' // Sets the text color to black
  };

  const handleImageButtonClick = () => {
    console.log("Image button clicked!");
  };

  const handleImageButtonClick2 = () => {
    console.log("Image button2 clicked!");
  };

  const handleImageButtonClick3 = () => {
    console.log("Image button3 clicked!");
  };

  const handleImageButtonClick4 = () => {
    console.log("Image button4 clicked!");
  };

  return (
    <div>
          <div className="images-container">

          <div className="img1">
            <Link to="/neardaum" onClick={handleImageButtonClick}>
              <img className="img1-locate" src={MainPageImg1} alt="MainPageImg1"/>
            </Link>
            <Link to="/neardaum" onClick={handleImageButtonClick} style={linkStyle}>
              <div className="round-rectangle">
                <p style={{ fontFamily: 'GmarketSans, sans-light' }}>근처땜빵</p>
              </div>
            </Link>
          </div>

          <div className="img2">
            <Link to="/endlinedaum" onClick={handleImageButtonClick2} style={linkStyle}>
              <img className="img2-locate" src={MainPageImg2} alt="MainPageImg2"/>
            </Link>
            <Link to="/endlinedaum" onClick={handleImageButtonClick2}>
              <div className="round-rectangle2">
                <p style={{ fontFamily: 'GmarketSans, sans-light' }}>마감임박 땜방</p>
              </div>
            </Link>
          </div>

          <div className="img3">
            <Link to="/newdaum" onClick={handleImageButtonClick3}>
              <img className="img3-locate" src={MainPageImg3} alt="MainPageImg3"/>  
            </Link>
            <Link to="/newdaum" onClick={handleImageButtonClick3}>
              <div className="round-rectangle3">
                <p style={{ fontFamily: 'GmarketSans, sans-light' }}>최신땜방</p>
              </div>
            </Link>
          </div>

          <div className="img4">
            <Link to="/recomdaum" onClick={handleImageButtonClick4}>
              <img className="img4-locate" src={MainPageImg4} alt="MainPageImg4"/>
            </Link>
            <Link to="/recomdaum" onClick={handleImageButtonClick}>
              <div className="round-rectangle4">
                <p style={{ fontFamily: 'GmarketSans, sans-light' }}>추천</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="brown-line1"></div>
    </div>
  );
};

export default MainPageRecommend;

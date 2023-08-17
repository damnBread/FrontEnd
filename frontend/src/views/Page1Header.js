import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Page1Header.css";

const Page1Header = () => {
  const linkStyle = {
    textDecoration: 'none', // Removes the underline
    color: 'black' // Sets the text color to black
  };

  return (
    <div className="damnhomeelementwhole">
      <div className="neardaum" style={{ fontFamily: 'GmarketSans, sans-bold' }}>근처땜빵</div>

      <div className="elements-container">
        <Link to="/details1" style={linkStyle}>
            <div className="round-rectangle-basic">
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>슬로우캘리 노원역점</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>서울 노원구</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>시급: 10000원</p>
            </div>
          </Link>

          <Link to="/details2" style={linkStyle}>
            <div className="round-rectangle-basic1">
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>투썸플레이스 노원문화점</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>서울 노원구</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>시급: 11000원</p>
            </div>
          </Link>

          <Link to="/details3" style={linkStyle}>
            <div className="round-rectangle-basic2">
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>컴포즈 공릉점</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>서울 노원구</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>시급: 11000원</p>
            </div>
          </Link>
      </div>

      <div className="elements-container">
        <Link to="/details4" style={linkStyle}>
            <div className="round-rectangle-basic">
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>인생네컷 노원역점</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>서울 노원구</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>시급: 10000원</p>
            </div>
          </Link>

          <Link to="/details5" style={linkStyle}>
            <div className="round-rectangle-basic1">
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>새마을식당 노원문화점</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>서울 노원구</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>시급: 11000원</p>
            </div>
          </Link>

          <Link to="/details6" style={linkStyle}>
            <div className="round-rectangle-basic2">
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>이디아 공릉점</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>서울 노원구</p>
              <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light', textDecoration: 'none' }}>시급: 11000원</p>
            </div>
          </Link>
      </div>



    </div>
  );
};

export default Page1Header;

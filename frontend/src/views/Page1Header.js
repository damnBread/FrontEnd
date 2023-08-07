import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Page1Header.css";

const Page1Header = () => {
  const linkStyle = {
    textDecoration: 'none', // Removes the underline
    color: 'black' // Sets the text color to black
  };

  return (
    <div>
      <div className="neardaum" style={{ fontFamily: 'GmarketSans, sans-bold' }}>근처땜빵</div>

      <Link to="/details" style={linkStyle}>
        <div className="round-rectangle-basic">
          <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light' }}>슬로우캘리 종각역점</p>
          <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light' }}>서울 종로구</p>
          <p className="daumtitle" style={{ fontFamily: 'GmarketSans, sans-light' }}>시급: 10000원</p>
        </div>
      </Link>
    </div>
  );
};

export default Page1Header;

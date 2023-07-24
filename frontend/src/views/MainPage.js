import React from 'react';
import Header from '../components/Headers/Header';
import MainPageImg1 from '../assets/img/MainPageImg1.png';
import '../assets/css/MainPage.css';

const MainPage = () => {
  const handleImageButtonClick = () => {
    console.log('Image button clicked!');
  };

  return (
    <div>
      <Header />
      <div>
      {/* <div className="brown-line"></div> */}  
        <a href="#" onClick={handleImageButtonClick}>
          <img
            className="img1-locate"
            src={MainPageImg1}
            alt="MainPageImg1"
          />
        </a>
        <a href="#" onClick={handleImageButtonClick}>
          <div className="round-rectangle">
            <p>근처땜빵</p>
          </div>
        </a>
        <div className="brown-line1"></div>
      </div>
    </div>
  );
};

export default MainPage;

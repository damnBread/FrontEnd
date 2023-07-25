import React from "react";
import Header from "../components/Headers/Header";
import "../assets/css/MainPage.css";
import Footer from "../components/Footers/Footer";
import { Container } from "react-bootstrap";
import MainPageRecommend from "./MainPageRecommend";
import Page1Header from "./Page1Header";
import damnlist from "./damnlist";

const MainPage = () => {

  return (
    <div>
      <Header />
      <MainPageRecommend/>
      <Page1Header/>
      <Footer/>
    </div>
  );
};

export default MainPage;

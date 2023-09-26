import React from "react";
import Header from "../components/Headers/Header";
import Chatting from "../components/chatting";
import "../assets/css/MainPage.css";
import Footer from "../components/Footers/Footer";
import { CookiesProvider } from 'react-cookie';
import { Container } from "react-bootstrap";
import MainPageRecommend from "./MainPageRecommend";
import Page1Header from "./Page1Header";
import damnlist from "./damnlist";

const MainPage = () => {

  return (
    <div>
      <CookiesProvider>
        <Header />
        <MainPageRecommend/>
        <Page1Header/>
        <Footer/>
        <Chatting/>
      </CookiesProvider>
    </div>
  );
};

export default MainPage;

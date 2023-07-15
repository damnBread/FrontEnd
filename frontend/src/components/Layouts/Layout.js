import React from "react";
import Footer from '../Footers/Footer';
import Header from '../Headers/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

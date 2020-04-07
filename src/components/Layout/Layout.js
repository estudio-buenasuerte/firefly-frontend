import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import "reset-css";
import "./Layout.scss";

const Layout = ({ children, slimFooter }) => {
  return (
    <>
      <Header />
      {children}
      <Footer slimFooter={slimFooter} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

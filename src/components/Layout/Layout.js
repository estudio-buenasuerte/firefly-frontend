import React from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
// import "reset-css";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="site-wrapper">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

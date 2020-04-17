import React, { useState } from "react";
import { Link } from "gatsby";
import { useMediaQuery } from "react-responsive";
import DroneWhite from "../../images/drone-white.svg";
import Logo from "../../images/site-logo.svg";
import styled from "styled-components";
import "../Layout/Layout.scss";

const HeaderWrapper = styled.header`
  padding: 20px;
  display: flex;
  z-index: 9;
  justify-content: space-between;
  align-items: flex-start;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;

  @media (min-width: 1024px) {
    padding: 20px;
  }

  a {
    font-size: 1.333em;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .site-logo {
    img {
      max-height: 32px;

      @media (min-width: 1024px) {
        max-height: 46px;
      }
    }
  }

  .site-nav {
    a {
      margin-left: 20px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
`;

const MobileNav = styled.nav`
  width: 100vw;
  background-color: #191d1e;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  display: none;

  .mobile-nav-heading {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &.open {
    display: block;
    width: 100vw;
    overflow: hidden;
    padding-top: 100px;
    a {
      font-size: 2em;
      display: block;
      margin-bottom: 20px;
      padding-left: 20px;
      text-decoration: none;
    }
  }
`;

const Header = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [headerOpen, setHeaderOpen] = useState(false);
  return (
    <React.Fragment>
      <HeaderWrapper>
        <aside className="site-logo">
          <Link to={"/"}>
            <img src={Logo} />
          </Link>
        </aside>
        {isDesktopOrLaptop && (
          <>
            <nav className="site-nav">
              <Link to={"/work"}>Work</Link>
              <Link to={"/options"}>Options</Link>
              <Link to={"/about"}>Contact</Link>
            </nav>
          </>
        )}
        {isTabletOrMobile && (
          <img
            className="mobile-trigger"
            src={DroneWhite}
            onClick={() => setHeaderOpen(!headerOpen)}
          />
        )}
      </HeaderWrapper>
      {isTabletOrMobile && (
        <>
          <MobileNav className={`mobile-nav ${headerOpen ? "open" : ""}`}>
            <Link to={"/work"}>Work</Link>
            <Link to={"/options"}>Options</Link>
            <Link to={"/about"}>Contact</Link>
          </MobileNav>
        </>
      )}
    </React.Fragment>
  );
};

export default Header;

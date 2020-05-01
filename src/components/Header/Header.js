import React, { useState } from "react";
import { Link } from "gatsby";
import { useMediaQuery } from "react-responsive";
import DroneWhite from "../../images/drone-white.svg";
import Logo from "../../images/site-logo.svg";
import styled from "styled-components";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
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

  transition: transform 0.5s ease, background-color 0.5s ease;

  &.scroll-down {
    transform: translateY(calc(-100%));
  }

  &.scroll-up {
    /* background-color: #1b1f21; */
    /* background-color: #000; */
  }

  @media (min-width: 1024px) {
    padding: 20px 50px;
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
      max-height: 24px;

      @media (min-width: 1024px) {
        max-height: 36px;
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
      text-align: right;
      font-size: 2em;
      display: block;
      margin-bottom: 20px;
      padding: 0 20px;
      text-decoration: none;
    }
  }
`;

const Header = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [headerOpen, setHeaderOpen] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    const header = document.querySelector(".header");

    if (currPos.y < prevPos.y) {
      header.classList.add("scroll-down");
      header.classList.remove("scroll-up");
    } else {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    if (currPos.y === 0) {
      header.classList.remove("scroll-up");
      header.classList.remove("scroll-down");
    }
  });

  return (
    <React.Fragment>
      <HeaderWrapper className="header">
        <aside className="site-logo">
          <Link to={"/"}>
            <img src={Logo} alt="Firefly Logo" />
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
            alt="Firefly Logo"
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

import React, { useState } from "react";
import { Link } from "gatsby";
import { useMediaQuery } from "react-responsive";
import DroneWhite from "../../images/drone-white.svg";
import Logo from "../../images/site-logo.svg";
import "./Header.scss";

const Header = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1023px)" });

  const [headerOpen, setHeaderOpen] = useState(false);
  return (
    <React.Fragment>
      <header>
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
      </header>
      {isTabletOrMobile && (
        <>
          <nav className={`mobile-nav ${headerOpen ? "open" : ""}`}>
            <Link to={"/work"}>Work</Link>
            <Link to={"/options"}>Options</Link>
            <Link to={"/about"}>Contact</Link>
          </nav>
        </>
      )}
    </React.Fragment>
  );
};

export default Header;

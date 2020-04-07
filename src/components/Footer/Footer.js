import React, { useState } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import styled from "styled-components";
import DroneBlack from "../../images/drone-black.svg";
import ArrowWhite from "../../images/arrow-white.svg";
import ArrowBlack from "../../images/arrow-black.svg";

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  &.full {
    background-color: #d5dee2;
    padding: 10px;
    min-height: 100vh;
    color: black;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    h2 {
      margin: 0;
    }
    li {
      list-style-image: url(${ArrowBlack});
    }
    @media (min-width: 1024px) {
      padding: 20px;
      flex-direction: row;
    }
  }
`;

const Heading = styled.header`
  order: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  width: 100%;

  .footer-icon {
    display: none;
  }

  @media (min-width: 1024px) {
    .logo-desc {
      p {
        max-width: 50%;
      }
    }
    .footer-icon {
      display: block;
    }
  }
`;

const Section = styled.section`
  width: 100%;

  @media (min-width: 1024px) {
    &.footer-links,
    &.footer-form {
      width: calc(50% - 10px);
    }
  }

  &.footer-links {
    order: 3;
    margin-bottom: 40px;
  }
  &.footer-form {
    order: 2;
  }

  @media (min-width: 1024px) {
    &.footer-links {
      order: 2;
      margin-bottom: 0;
    }
    &.footer-form {
      order: 3;
    }
  }
`;

const List = styled.ul`
  padding: 0%;
  margin: 0 0 40px 0;
  li {
    margin: 0 0 10px 1.5em;
    list-style-image: url(${ArrowWhite});
    a {
      text-decoration: none;
    }
  }
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  margin-bottom: 40px;

  label {
    /* visibility: hidden; */
    display: none;
  }

  input,
  textarea {
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 1px solid;
    background-color: transparent;
    width: 100%;
    &.name,
    &.email {
      width: calc(50% - 10px);
    }
    &::placeholder {
      color: #6b6b6b;
      font-size: 1rem;
    }
  }

  textarea {
    resize: none;
    padding: 10px 10px 50px;
  }

  button {
    position: absolute;
    right: 0;
    bottom: 25px;
    padding: 0%;
    background-color: transparent;
    font-size: 1rem;
    border: none;
  }

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const CreditsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  display: flex;
  order: 4;
  width: 100%;
  small {
    font-size: 0.667em;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Footer = ({ slimFooter }) => {
  const data = useStaticQuery(graphql`
    {
      allSanityFooter {
        nodes {
          title
          _rawDescription
          goodForList {
            list
          }
          connectList {
            list {
              title
              url
              _key
            }
          }
          aboutList {
            list {
              url
              title
            }
          }
        }
      }
    }
  `);
  const [footerData] = useState(data.allSanityFooter.nodes[0]);

  const submitForm = (e) => {
    e.preventDefault();
    alert("TBD");
  };

  return (
    <FooterWrapper className={`footer ${slimFooter ? "slim" : "full"}`}>
      {slimFooter ? (
        ""
      ) : (
        <React.Fragment>
          <Heading>
            <section className="logo-desc">
              {footerData.title && (
                <h2 className="footer-title">{footerData.title}</h2>
              )}
              {footerData._rawDescription && (
                <BlockContent blocks={footerData._rawDescription} />
              )}
            </section>
            <img src={DroneBlack} className="footer-icon" />
          </Heading>

          <Section className="footer-links">
            <List className="connect">
              <Title>Connect</Title>
              {footerData.connectList.list.map((item) => {
                return (
                  <li key={item._key}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </List>
            <List className="about">
              <Title>About</Title>
              {footerData.aboutList.list.map((item) => {
                return (
                  <li key={item._key}>
                    <Link to={item.url}>{item.title}</Link>
                  </li>
                );
              })}
            </List>
          </Section>
          <Section className="footer-form">
            <Title>Let's Work Together</Title>
            <Form onSubmit={submitForm}>
              <label htmlFor="name" className="invisible name">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="name"
                placeholder="Name"
              />
              <label htmlFor="email" className="invisible email">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="email"
                placeholder="Email Address"
              />
              <label htmlFor="subject" className="invisible subject">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                className="subject"
                placeholder="Subject"
              />
              <label htmlFor="message" className="invisible message">
                Message
              </label>
              <textarea
                type="text"
                name="message"
                className="message"
                placeholder="Message"
                resize="false"
              />
              <button type="submit">Send Message</button>
            </Form>
          </Section>
        </React.Fragment>
      )}
      <CreditsWrapper>
        <small>©{new Date().getFullYear()} Firefly Drone Shows</small>
        <small>
          Site by{" "}
          <a
            href="https://www.buena-suerte.studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buena Suerte
          </a>
        </small>
      </CreditsWrapper>
    </FooterWrapper>
  );
};

export default Footer;

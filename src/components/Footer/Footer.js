import React, { useState } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import styled from "styled-components";
import DroneBlack from "../../images/drone-black.svg";
import ArrowWhite from "../../images/arrow-white.svg";
import ArrowBlack from "../../images/arrow-black.svg";
import MailerService from "../../util/mailer";
import xss from "xss";

const FooterWrapper = styled.footer`
  box-sizing: border-box;
  padding: 20px;

  &.full {
    background-color: #d5dee2;
    min-height: 100vh;
    color: black;

    width: 100%;
    position: absolute;
    z-index: 10;
    overflow: hidden;
    h2 {
      margin: 0;
    }

    li {
      list-style-image: url(${ArrowBlack});
    }

    @media (min-width: 1024px) {
      padding: 20px 50px;
      flex-direction: row;
    }
  }

  &.slim {
    @media (min-width: 1024px) {
      padding: 20px 50px;
    }
  }
`;

const SlimFooter = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

  @media (min-width: 1024px) {
    flex-direction: row;
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
      h2 {
        font-size: 2rem;
      }
      p {
        max-width: 50%;
      }
    }
    .footer-icon {
      display: block;
    }
  }

  @media (min-width: 1600px) {
    .logo-desc {
      h2 {
        font-size: 2.6666666667rem;
      }
    }
  }
`;

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  left: 20px;
  right: 20px;
  order: 2;
  height: auto;

  @media (min-width: 1024px) {
    position: absolute;
    top: 33.3%;
    flex-direction: row;
    width: auto;
    left: 50px;
    right: 50px;
  }
`;

const Aside = styled.aside`
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
    display: flex;
    flex-direction: column;
    .connect {
      order: 2;
    }
    .about {
      order: 1;
    }
  }
  &.footer-form {
    order: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (min-width: 1024px) {
    &.footer-links {
      margin-bottom: 0;
      height: auto;

      .connect {
        order: 1;
      }
      .about {
        order: 2;
      }
    }
    &.footer-form {
      order: 3;
    }
  }
`;

const SlimTitleSection = styled.section`
  box-sizing: border-box;
  width: 100%;

  h3 {
    margin: 0 0 -0.25em 0;
  }

  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 20px;

    h3 {
      font-size: 1.5em;
    }
  }
`;

const SlimLinkSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;

  aside {
    a {
      display: block;
      text-decoration: none;
      line-height: 1.25rem;
    }
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    aside {
      width: calc(50% - 20px);
    }
  }
`;

const List = styled.ul`
  padding: 0%;
  margin: 0 0 40px 0;

  li {
    margin: 0 0 10px 25px;
    padding-left: 5px;
    list-style-image: url(${ArrowWhite});
    a {
      text-decoration: none;
    }
  }

  &.good {
    max-width: 50ch;
    margin: 0;

    list-style: disc;

    h3 {
      width: 100%;
    }

    li {
      width: 40%;
      padding-right: 10px;
      list-style-image: url();
    }

    display: flex;
    flex-wrap: wrap;
  }

  @media (min-width: 1024px) {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Title = styled.h3`
  margin: 0 0 20px 0;

  @media (min-width: 1024px) {
    &.form-title {
      font-size: 32px;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  margin-bottom: 40px;

  label {
    visibility: hidden;
    position: absolute;
    left: 999999999px;
  }

  input,
  textarea {
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 1px solid;
    border-radius: 0;
    -webkit-appearance: none;
    background-color: transparent;
    width: 100%;
    font-size: 1rem;

    &:focus {
      outline: 1px solid transparent;
    }

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
    textarea {
      padding: 10px 10px 100px;
    }
  }
`;

const CreditsWrapper = styled.section`
  display: flex;
  margin-top: auto;
  display: flex;
  order: 4;
  width: 100%;
  position: absolute;
  bottom: 20px;

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
  const [feedback, setFeedback] = useState({
    success: null,
    message: null,
  });

  const submitForm = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = e.target;

    MailerService.sendMail({
      name: xss(name.value),
      email: xss(email.value),
      subject: xss(subject.value),
      message: xss(message.value),
    })
      .then((res) => {
        name.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";

        setFeedback({ success: true, message: "Thanks for reaching out!" });
      })
      .catch((err) => {
        setFeedback({
          success: false,
          message: "Uh oh. Something went wrong.",
        });
        console.error(err);
      });
  };

  return (
    <FooterWrapper className={`footer ${slimFooter ? "slim" : "full"}`}>
      {slimFooter ? (
        <SlimFooter>
          <SlimTitleSection className="">
            <h3>Firefly Drone Shows</h3>
            <p>Detroit, MI</p>
          </SlimTitleSection>
          <SlimLinkSection>
            <aside>
              <a href="mailto:info@fireflydroneshows.com">
                info@fireflydroneshows.com
              </a>
              <a href="tel:12484616615">+1 248 461 6615</a>
            </aside>
            <aside>
              <Link to={"/work"}>Work</Link>
              <Link to={"/options"}>Options</Link>
              <Link to={"/case-study"}>Case Study</Link>
            </aside>
          </SlimLinkSection>
        </SlimFooter>
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
            <img src={DroneBlack} alt="Firefly Drone" className="footer-icon" />
          </Heading>

          <SectionWrapper>
            <Aside className="footer-links">
              <List className="connect">
                <Title>Connect</Title>
                {footerData.connectList.list.map((item) => {
                  return (
                    <li key={item.url}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  );
                })}
              </List>
              <List className="about">
                <Title>About</Title>
                {footerData.aboutList.list.map((item) => {
                  return (
                    <li key={item.url}>
                      <Link to={item.url}>{item.title}</Link>
                    </li>
                  );
                })}
              </List>
            </Aside>
            <Aside className="footer-form">
              <Title className="form-title">Let's Work Together</Title>
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
                  data-gramm_editor="false"
                />
                <button type="submit">Send Message</button>
              </Form>
              {feedback.message && (
                <p className={feedback.success ? "success" : "error"}>
                  {feedback.message}
                </p>
              )}
            </Aside>
          </SectionWrapper>
        </React.Fragment>
      )}
      <CreditsWrapper>
        <small>© {new Date().getFullYear()} Firefly Drone Shows</small>
      </CreditsWrapper>
    </FooterWrapper>
  );
};

export default Footer;

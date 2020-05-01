import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import SEO from "../components/seo";
import BlockContent from "@sanity/block-content-to-react";
import ArrowBlack from "../images/arrow-black.svg";
import MailerService from "../util/mailer";
import xss from "xss";
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  VolumeMenuButton,
} from "video-react";

const HeroSection = styled.section`
  width: 100%;

  background-position: center;
  background-size: contain;

  img {
    max-width: 100%;
    width: 100%;
  }
`;

const HeroText = styled.section`
  padding: 100px 20px;

  h1 {
    font-size: 1.77777rem;
    margin: 0;
    font-weight: normal;
  }

  @media (min-width: 1024px) {
    padding: 150px 50px;

    h1 {
      font-size: 3.5555555rem;
    }
  }

  @media (min-width: 1600px) {
    h1 {
      font-size: 5rem;
    }
  }
`;
const AboutWrapper = styled.section`
  padding: 100px 20px;
  background-color: #d5dee2;

  @media (min-width: 1024px) {
    padding: 150px 50px 150px;
  }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  color: #191d1e;
  padding-bottom: 50px;

  &:last-of-type {
    padding-bottom: 0;
  }
  h2,
  p {
    margin: 0 0 1rem;
  }

  ul {
    margin: 0;
  }

  @media (min-width: 1024px) {
    padding: 0 50px 100px;

    flex-direction: row;
    align-items: flex-start;

    &:first-of-type {
      padding: 0 20px 40px;
    }

    .title {
      width: calc(25% - 20px);
      margin-left: auto;
      h2 {
        font-size: 46px;
      }
    }

    .about-details {
      width: calc(50% - 20px);
      padding-left: 20px;
      font-size: 1.333333rem;
    }
  }
`;

const ConnectSection = styled.section`
  padding: 100px 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    padding: 150px 50px;
    flex-direction: row;
    align-items: flex-start;

    h3 {
      width: calc(25% - 20px);
      margin: 0 0 0 auto;
      font-size: 32px;
    }

    form {
      width: calc(50%);
      padding-left: 20px;
    }
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 40px 0 40px 0;

  li {
    margin: 0 0 10px 25px;
    padding-left: 5px;
    list-style-image: url(${ArrowBlack});

    a {
      text-decoration: none;
    }
  }

  &.good {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      width: 40%;
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
    color: #fff;
    border-radius: 0;
    -webkit-appearance: none;
    border-bottom: 1px solid #fff;
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
    color: #fff;
  }

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const ClientList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  align-content: center;
  align-items: center;
  margin-top: 40px;
  padding: 0;

  @media (min-width: 1024px) {
    margin-top: 150px;
  }
`;

const ClientLogo = styled.li`
  width: 50%;
  margin-bottom: 40px;
  box-sizing: border-box;
  text-align: center;

  img {
    max-height: 50px;
    width: auto;
    max-width: 66.6%;
  }

  @media (min-width: 1024px) {
    width: 25%;
    margin-bottom: 60px;
  }
`;

const VideoMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const About = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityAbout {
        nodes {
          heroAsset {
            asset {
              url
            }
          }
          heroText
          aboutHeading
          _rawAboutDescription
          contact {
            list {
              title
              url
            }
          }
          clientLogos {
            _key
            asset {
              url
              originalFilename
            }
          }
          goodForList {
            list
          }
        }
      }
    }
  `);

  const [aboutData] = useState(data.allSanityAbout.nodes[0]);
  const [feedback, setFeedback] = useState({
    success: null,
    message: null,
  });

  const isImage = (url) => {
    const ending = url.split(".")[url.split(".").length - 1];
    let result;

    switch (ending) {
      case "jpg":
        result = true;
        break;
      case "png":
        result = true;
        break;
      case "jpeg":
        result = true;
        break;
      case "gif":
        result = true;
        break;
      default:
        break;
    }
    return result;
  };

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
    <Layout slimFooter={true}>
      <SEO title="About" />

      <HeroSection>
        {isImage(aboutData.heroAsset.asset.url) ? (
          <img src={aboutData.heroAsset.asset.url} alt="Firefly Drone Shows" />
        ) : (
          <>
            <VideoMask />
            <Player
              playsInline
              autoPlay={true}
              loop={true}
              muted={true}
              src={aboutData.heroAsset.asset.url}
            >
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <VolumeMenuButton disabled />
              </ControlBar>
            </Player>
          </>
        )}
      </HeroSection>

      <HeroText>{aboutData.heroText && <h1>{aboutData.heroText}</h1>}</HeroText>
      <AboutWrapper>
        <AboutSection>
          <aside className="title">
            <h2>{aboutData.aboutHeading}</h2>
          </aside>
          <aside className="about-details">
            <BlockContent blocks={aboutData._rawAboutDescription} />
            {aboutData.contact && <List></List>}
          </aside>
        </AboutSection>
        <AboutSection>
          <aside className="title"></aside>
          <aside className="about-details">
            <h3>Our shows are perfect for:</h3>
            <List className="good">
              {aboutData.goodForList.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </aside>
        </AboutSection>
        {aboutData.clientLogos && (
          <React.Fragment>
            {/* <aside className="title">
              <h2>Select Clients:</h2>
            </aside> */}
            <ClientList className="about-details client-list">
              {aboutData.clientLogos.map((logo) => {
                return (
                  <ClientLogo key={logo._key}>
                    <img
                      src={logo.asset.url}
                      alt={logo.asset.originalFilename}
                    />
                  </ClientLogo>
                );
              })}
            </ClientList>
          </React.Fragment>
        )}
      </AboutWrapper>

      <ConnectSection>
        <h3>Let's Work Together</h3>
        <Form onSubmit={submitForm}>
          <label htmlFor="name" className="invisible name">
            Name
          </label>
          <input type="text" name="name" className="name" placeholder="Name" />
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
          {feedback.message && (
            <p className={feedback.success ? "success" : "error"}>
              {feedback.message}
            </p>
          )}
        </Form>
      </ConnectSection>
    </Layout>
  );
};

export default About;

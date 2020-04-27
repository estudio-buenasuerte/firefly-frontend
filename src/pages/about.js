import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import SEO from "../components/seo";
import BlockContent from "@sanity/block-content-to-react";
import ArrowBlack from "../images/arrow-black.svg";
import MailerService from "../util/mailer";

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
    padding: 300px 20px;

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
    padding: 300px 20px 200px;
  }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  color: #191d1e;

  &:first-of-type {
    padding-bottom: 50px;
  }
  h2,
  p {
    margin: 0 0 1rem;
  }

  ul {
    margin: 0;
  }

  @media (min-width: 1024px) {
    padding: 0 20px 100px;
    &:first-of-type {
      padding-bottom: 100px;
    }
    flex-direction: row;
    align-items: flex-start;

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
    padding: 300px 20px;
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
            asset {
              title
              url
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

  const submitForm = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = e.target;

    MailerService.sendMail({
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
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
        {aboutData.heroAsset.asset.url.split(".")[
          aboutData.heroAsset.asset.url.split(".").length - 1
        ] === "gif" ||
        aboutData.heroAsset.asset.url.split(".")[
          aboutData.heroAsset.asset.url.split(".").length - 1
        ] === "png" ? (
          <img src={aboutData.heroAsset.asset.url} alt="Firefly Drone Shows" />
        ) : (
          ""
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
          <aside className="title">
            <h2>Our shows are perfect for:</h2>
          </aside>
          <aside className="about-details">
            <List className="good">
              {aboutData.goodForList.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          </aside>
        </AboutSection>
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
        </Form>
      </ConnectSection>
    </Layout>
  );
};

export default About;

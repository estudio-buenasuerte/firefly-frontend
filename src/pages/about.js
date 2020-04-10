import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import SEO from "../components/seo";
import BlockContent from "@sanity/block-content-to-react";
import ArrowBlack from "../images/arrow-black.svg";

const HeroSection = styled.section`
  width: 100%;
  height: 75vh;
  background-position: center;
  background-size: cover;

  @media (min-width: 1024px) {
    height: 100vh;
  }
`;

const AboutSection = styled.section`
  padding: 100px 20px;
  background-color: #d5dee2;
  display: flex;
  flex-direction: column;
  color: #191d1e;

  h2,
  p {
    margin: 0 0 1rem;
  }
  @media (min-width: 1024px) {
    padding: 300px 20px;
    flex-direction: row;
    align-items: flex-start;

    .title {
      width: calc(25% - 20px);
      margin-left: auto;
      font-size: 2rem;
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
      margin-left: auto;
      font-size: 2rem;
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
        }
      }
    }
  `);

  const [aboutData] = useState(data.allSanityAbout.nodes[0]);

  const submitForm = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = e.target;
    alert(
      `Hi, ${name.value}. We'll send an email from ${email.value} when we're ready.`
    );
  };

  return (
    <Layout slimFooter={true}>
      <SEO title="About" />

      <HeroSection
        style={{
          backgroundImage: "url(" + aboutData.heroAsset.asset.url + ")",
        }}
      />

      <AboutSection>
        <aside className="title">
          <h2>{aboutData.heroText}</h2>
        </aside>
        <aside className="about-details">
          <BlockContent blocks={aboutData._rawAboutDescription} />
          {aboutData.contact && <List></List>}
        </aside>
      </AboutSection>

      <ConnectSection>
        <Title>Let's Work Together</Title>
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

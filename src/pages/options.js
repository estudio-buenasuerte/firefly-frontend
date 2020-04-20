import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
// import Saturn100 from "../images/100_800.mp4";
import Saturn100 from "../images/100_720_V6.mp4";
import Saturn200 from "../images/200_800.mp4";
import Saturn300 from "../images/300_800.mp4";
import BlockContent from "@sanity/block-content-to-react";
import { Player } from "video-react";

const OptionsSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 100px 20px;

  @media (min-width: 1024px) {
    padding: 150px 20px 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const OptionVidSection = styled.aside`
  width: 100%;

  box-sizing: border-box;

  img {
    max-width: 100%;
    width: 100%;
  }

  .video-react {
    margin-bottom: 20px;
  }

  .video-react-control-bar,
  .video-react-big-play-button {
    display: none;
  }

  video {
    &:focus {
      outline: 1px solid transparent;
    }
  }

  @media (min-width: 1024px) {
    width: calc(33.33% - 13.3333px);
  }
`;

const BigTitle = styled.h2`
  font-size: 36px;
  margin: 0 0 -10px 0;

  @media (min-width: 1024px) {
    margin: 0 0 20px 0;
    font-size: 48px;
  }
`;

const MediumTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 20px 0;

  @media (min-width: 1024px) {
    margin: 0 0 40px 0;
    font-size: 36px;
  }
`;

const MediumLink = styled.span`
  font-size: 18px;
  text-decoration: underline;

  &:hover {
    opacity: 0.56;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const StockVSCustom = styled.section`
  padding: 10px;
  margin: 50px 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    padding: 20px;
    margin: 300px 0;
    flex-direction: row;
  }
`;

const StockVSCustomDiv = styled.aside`
  @media (min-width: 1024px) {
    p {
      max-width: 65ch;
      font-size: 20px;
    }
    width: 50%;
    &:first-of-type {
      padding-right: 10px;
    }
    &:nth-of-type(2) {
      padding-left: 10px;
    }
  }
`;

const ImageOnLeft = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  p {
    max-width: 70ch;
  }

  img {
    max-width: 100%;
    width: 100%;
  }

  @media (min-width: 1024px) {
    padding: 20px;
    margin: 300px 0;
    flex-direction: row;

    p {
      font-size: 20px;
      max-width: 65ch;
    }

    aside {
      width: 50%;
      &:first-of-type {
        padding-right: 10px;
      }
      &:nth-of-type(2) {
        padding-left: 10px;
      }
    }
  }
`;

const ImageOnRight = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  p {
    max-width: 70ch;
  }

  img {
    max-width: 100%;
    width: 100%;
  }

  aside {
    &:first-of-type {
      order: 2;
    }
    &:nth-of-type(2) {
      order: 1;
    }
  }

  @media (min-width: 1024px) {
    padding: 20px;
    margin: 300px 0;
    flex-direction: row;

    p {
      font-size: 20px;
      max-width: 65ch;
    }

    aside {
      width: 50%;
      &:first-of-type {
        padding-right: 10px;
        order: 1;
      }
      &:nth-of-type(2) {
        padding-left: 10px;
        order: 2;
      }
    }
  }
`;

const Options = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityOptions {
        nodes {
          oneHundredTitle
          twoHundredTitle
          threeHundredTitle
          _rawStockDescription
          _rawCustomDescription
          oneHundredDroneImage {
            asset {
              url
            }
          }
          _rawOneHundredDronesDescription
          oneHundredDronesList {
            list
          }
          twoHundredDroneImage {
            asset {
              url
            }
          }
          _rawTwoHundredDronesDescription
          twoHundredDronesList {
            list
          }
          threeHundredDroneImage {
            asset {
              url
            }
          }
          _rawThreeHundredDronesDescription
          threeHundredDronesList {
            list
          }
        }
      }
    }
  `);
  const [optionsData] = useState(data.allSanityOptions.nodes[0]);

  return (
    <Layout slimFooter={false}>
      <SEO title="Options" />

      <OptionsSection>
        <OptionVidSection>
          <Player
            playsInline={true}
            autoPlay={true}
            loop={true}
            src={Saturn100}
            muted={true}
          />

          <BigTitle>100 Drones</BigTitle>
          <h3>{optionsData.oneHundredTitle}</h3>
        </OptionVidSection>
        <OptionVidSection>
          <Player
            playsInline={true}
            autoPlay={true}
            loop={true}
            src={Saturn200}
            muted={true}
          />
          <BigTitle>200 Drones</BigTitle>
          <h3>{optionsData.twoHundredTitle}</h3>
        </OptionVidSection>
        <OptionVidSection>
          <Player
            playsInline={true}
            autoPlay={true}
            loop={true}
            src={Saturn300}
            muted={true}
          />
          <BigTitle>300 Drones</BigTitle>
          <h3>{optionsData.threeHundredTitle}</h3>
        </OptionVidSection>
      </OptionsSection>

      <StockVSCustom>
        <StockVSCustomDiv classname="stock">
          {optionsData._rawStockDescription && (
            <React.Fragment>
              <MediumTitle>Stock</MediumTitle>
              <BlockContent blocks={optionsData._rawStockDescription} />
            </React.Fragment>
          )}
        </StockVSCustomDiv>
        <StockVSCustomDiv className="custom">
          {optionsData._rawCustomDescription && (
            <React.Fragment>
              <MediumTitle>Custom</MediumTitle>
              <BlockContent blocks={optionsData._rawCustomDescription} />
              <MediumLink>
                <Link to={"/case-study"}>View Custom Case Study</Link>
              </MediumLink>
            </React.Fragment>
          )}
        </StockVSCustomDiv>
      </StockVSCustom>

      <ImageOnLeft>
        {optionsData.oneHundredDroneImage && (
          <aside>
            <img
              src={optionsData.oneHundredDroneImage.asset.url}
              alt="100 Drones"
            />
          </aside>
        )}
        {optionsData._rawOneHundredDronesDescription && (
          <aside>
            <BigTitle>100 Drones</BigTitle>
            <BlockContent
              blocks={optionsData._rawOneHundredDronesDescription}
            />
          </aside>
        )}
      </ImageOnLeft>

      <ImageOnRight>
        {optionsData._rawTwoHundredDronesDescription && (
          <aside>
            <BigTitle>200 Drones</BigTitle>
            <BlockContent
              blocks={optionsData._rawTwoHundredDronesDescription}
            />
          </aside>
        )}
        {optionsData.twoHundredDroneImage && (
          <aside>
            <img
              src={optionsData.twoHundredDroneImage.asset.url}
              alt="200 Drones"
            />
          </aside>
        )}
      </ImageOnRight>

      <ImageOnLeft>
        {optionsData.threeHundredDroneImage && (
          <aside>
            <img
              src={optionsData.threeHundredDroneImage.asset.url}
              alt="300 Drones"
            />
          </aside>
        )}
        {optionsData._rawThreeHundredDronesDescription && (
          <aside>
            <BigTitle>300 Drones</BigTitle>
            <BlockContent
              blocks={optionsData._rawThreeHundredDronesDescription}
            />
          </aside>
        )}
      </ImageOnLeft>
    </Layout>
  );
};

export default Options;

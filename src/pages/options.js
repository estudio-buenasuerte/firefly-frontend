import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
// import Saturn100 from "../images/100_800.mp4";
import Saturn100 from "../images/100_800_V7_Black.mp4";
import Saturn200 from "../images/200_800_V7_Black.mp4";
import Saturn300 from "../images/300_800_V7_Black.mp4";
import BlockContent from "@sanity/block-content-to-react";
import { Player } from "video-react";

const OptionsSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 100px 20px;

  @media (min-width: 1024px) {
    padding: 150px 50px 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const OptionVidSection = styled.aside`
  width: 100%;
  position: relative;

  box-sizing: border-box;

  img {
    max-width: 100%;
    width: 100%;
  }
  h3 {
    padding-right: 20px;
  }

  .video-react {
    margin-bottom: 20px;
  }

  .video-react-control-bar,
  .video-react-big-play-button {
    display: none;
  }

  video {
    background-color: #000000;

    &:focus {
      outline: 1px solid transparent;
    }
  }

  @media (min-width: 1024px) {
    width: calc(33.33% - 13.3333px);

    .video-react {
      max-width: 500px;
      margin: 0 auto;
    }
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

const BigTitle = styled.h2`
  font-size: 36px;
  margin: 0 0 -10px 0;

  @media (min-width: 1024px) {
    margin: 0 0 20px 0;
    font-size: 48px;
  }

  @media (min-width: 1400px) {
    font-size: 66px;
  }
`;

const MediumTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 20px 0;

  @media (min-width: 1024px) {
    margin: 0 0 40px 0;
    font-size: 36px;
  }

  @media (min-width: 1400px) {
    font-size: 48px;
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
  padding: 0 20px;
  margin: 25px 0 50px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    padding: 20px 50px;
    margin: 150px 0;
    flex-direction: row;
  }
`;

const StockVSCustomDiv = styled.aside`
  margin-bottom: 50px;

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
  margin-bottom: 50px;

  p {
    max-width: 70ch;
  }

  img {
    max-width: 100%;
    width: 100%;
    margin-bottom: 20px;
    @media (min-width: 1024px) {
      margin: 0;
    }
  }

  @media (min-width: 1024px) {
    padding: 20px 50px;
    margin: 150px 0;
    flex-direction: row;

    p {
      font-size: 20px;
      max-width: 50ch;
    }

    aside {
      &.img {
        padding-right: 10px;
        width: 60%;
      }
      &.desc {
        width: 40%;
        padding: 0 10px;
      }
    }
  }
`;

const ImageOnRight = styled.section`
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  p {
    max-width: 70ch;
  }

  img {
    max-width: 100%;
    width: 100%;
    margin-bottom: 20px;
    @media (min-width: 1024px) {
      margin: 0;
    }
  }

  aside {
    &.desc {
      order: 2;
      box-sizing: border-box;
    }
    &.img {
      order: 1;
    }
  }

  @media (min-width: 1024px) {
    padding: 20px 50px;
    margin: 150px 0;
    flex-direction: row;

    p {
      font-size: 20px;
      max-width: 50ch;
    }

    aside {
      &.desc {
        padding-right: 20px;

        order: 1;
        width: 40%;
      }
      &.img {
        padding-left: 10px;
        order: 2;
        width: 60%;
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
          stockTitle
          customTitle
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
          <VideoMask />
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
          <VideoMask />
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
          <VideoMask />
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
              <MediumTitle>
                {optionsData.stockTitle ? optionsData.stockTitle : "Stock"}
              </MediumTitle>
              <BlockContent blocks={optionsData._rawStockDescription} />
            </React.Fragment>
          )}
        </StockVSCustomDiv>
        <StockVSCustomDiv className="custom">
          {optionsData._rawCustomDescription && (
            <React.Fragment>
              <MediumTitle>
                {optionsData.customTitle ? optionsData.customTitle : "Custom"}
              </MediumTitle>
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
          <aside className="img">
            <img
              src={optionsData.oneHundredDroneImage.asset.url}
              alt="100 Drones"
            />
          </aside>
        )}
        {optionsData._rawOneHundredDronesDescription && (
          <aside className="desc">
            <BigTitle>100 Drones</BigTitle>
            <BlockContent
              blocks={optionsData._rawOneHundredDronesDescription}
            />
          </aside>
        )}
      </ImageOnLeft>

      <ImageOnRight>
        {optionsData._rawTwoHundredDronesDescription && (
          <aside className="desc">
            <BigTitle>200 Drones</BigTitle>
            <BlockContent
              blocks={optionsData._rawTwoHundredDronesDescription}
            />
          </aside>
        )}
        {optionsData.twoHundredDroneImage && (
          <aside className="img">
            <img
              src={optionsData.twoHundredDroneImage.asset.url}
              alt="200 Drones"
            />
          </aside>
        )}
      </ImageOnRight>

      <ImageOnLeft>
        {optionsData.threeHundredDroneImage && (
          <aside className="img">
            <img
              src={optionsData.threeHundredDroneImage.asset.url}
              alt="300 Drones"
            />
          </aside>
        )}
        {optionsData._rawThreeHundredDronesDescription && (
          <aside className="desc">
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

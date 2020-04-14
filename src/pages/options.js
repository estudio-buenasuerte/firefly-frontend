import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
import Saturn100 from "../images/100_Drone_800.gif";
import Saturn200 from "../images/200_Drone_800.gif";
import Saturn300 from "../images/300_Drone_800.gif";
import BlockContent from "@sanity/block-content-to-react";

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

const OptionGifSection = styled.aside`
  width: 100%;

  box-sizing: border-box;

  img {
    max-width: 100%;
    width: 100%;
  }

  @media (min-width: 1024px) {
    width: 33.33%;
    padding: 0 20px;
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

const MediumLink = styled.a`
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

  img {
    max-width: 100%;
    width: 100%;
  }

  @media (min-width: 1024px) {
    padding: 20px;
    margin: 300px 0;
    flex-direction: row;

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
        <OptionGifSection>
          <img src={Saturn100} />

          <BigTitle>100 Drones</BigTitle>
          <h3>{optionsData.oneHundredTitle}</h3>
        </OptionGifSection>
        <OptionGifSection>
          <img src={Saturn200} />
          <BigTitle>200 Drones</BigTitle>
          <h3>{optionsData.twoHundredTitle}</h3>
        </OptionGifSection>
        <OptionGifSection>
          <img src={Saturn300} />
          <BigTitle>300 Drones</BigTitle>
          <h3>{optionsData.threeHundredTitle}</h3>
        </OptionGifSection>
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
            <MediumTitle>100 Drones</MediumTitle>
            <BlockContent
              blocks={optionsData._rawOneHundredDronesDescription}
            />
          </aside>
        )}
      </ImageOnLeft>

      <ImageOnRight>
        {optionsData._rawTwoHundredDronesDescription && (
          <aside>
            <MediumTitle>200 Drones</MediumTitle>
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
            <MediumTitle>300 Drones</MediumTitle>
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

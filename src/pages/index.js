import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
import Transition from "../images/Transition_800.gif";
import Pancake from "../images/Project_Graphic_DS_Drones_.json";
import ArrowWhite from "../images/arrow-white.svg";
import BlockContent from "@sanity/block-content-to-react";

const HomeWrapper = styled.main``;

const HeroSection = styled.section`
  width: 100%;
  height: 75vh;
  background-position: center;
  background-size: cover;

  @media (min-width: 1024px) {
    height: 100vh;
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

const LottieSection = styled.section`
  padding: 0 20px 75px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .animation,
  .section-info {
    width: 100%;
  }

  .section-info {
    h2 {
      font-size: 1.5rem;
      margin-bottom: 40px;
    }
    p {
      font-size: 1.33333rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 0 20px 150px;
    flex-direction: row;
    justify-content: space-between;

    .animation,
    .section-info {
      width: calc(50% - 10px);
    }

    .section-info {
      h2 {
        margin-bottom: 60px;
        font-size: 2rem;
      }
    }
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 40px 0 40px 0;

  li {
    margin: 0 0 10px 25px;
    padding-left: 5px;
    list-style-image: url(${ArrowWhite});

    a {
      text-decoration: none;
    }
  }
`;

const TextSection = styled.section`
  padding: 150px 20px;
  display: flex;
  flex-direction: column;

  .section-info {
    h2 {
      font-size: 1.5rem;
      margin-bottom: 40px;
    }
    p {
      font-size: 1.33333rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 300px 20px;
    flex-direction: row;
    justify-content: space-between;

    .title-wrapper,
    .section-info {
      width: calc(50% - 10px);
    }

    .title-wrapper {
      .title {
        width: 50%;
        margin-left: auto;
        font-size: 2rem;
      }
    }
  }
`;

const Index = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityHome {
        nodes {
          heroAsset {
            asset {
              url
            }
          }
          heroText
          section1Heading
          _rawSection1Description
          section1List {
            list
          }
          heroAsset2 {
            asset {
              url
            }
          }
          section2Heading
          _rawSection2Description
          section2List {
            list
          }
        }
      }
    }
  `);
  const [homeData] = useState(data.allSanityHome.nodes[0]);
  // debugger;

  const lottieOpions = {
    loop: true,
    autoplay: true,
    animationData: Pancake,
  };
  return (
    <Layout slimFooter={false}>
      <SEO title="Home" />
      <HomeWrapper>
        <HeroSection
          style={{
            backgroundImage: "url(" + homeData.heroAsset.asset.url + ")",
          }}
        />

        <HeroText>
          <h1>{homeData.heroText}</h1>
        </HeroText>

        <LottieSection>
          <aside className="animation">
            <img src={Transition} alt="transition" />
          </aside>
          <aside className="section-info">
            {homeData.section1Heading && <h2>{homeData.section1Heading}</h2>}
            {homeData._rawSection1Description && (
              <BlockContent blocks={homeData._rawSection1Description} />
            )}
            {homeData.section1List.list && (
              <List className="section-1">
                {homeData.section1List.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            )}
          </aside>
        </LottieSection>

        <HeroSection
          style={{
            backgroundImage: "url(" + homeData.heroAsset2.asset.url + ")",
          }}
        />

        <TextSection>
          <aside className="title-wrapper">
            {homeData.section2Heading && (
              <h2 className="title">{homeData.section2Heading}</h2>
            )}
          </aside>
          <aside className="section-info">
            {homeData._rawSection2Description && (
              <BlockContent blocks={homeData._rawSection1Description} />
            )}
            {homeData.section2List.list && (
              <List className="section-1">
                {homeData.section2List.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            )}
          </aside>
        </TextSection>
      </HomeWrapper>
    </Layout>
  );
};

export default Index;

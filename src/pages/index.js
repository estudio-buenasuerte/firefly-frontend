import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
import Transition from "../images/Transition_800.mp4";
import ArrowWhite from "../images/arrow-white.svg";
import BlockContent from "@sanity/block-content-to-react";
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  VolumeMenuButton,
} from "video-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeWrapper = styled.main`
  video {
    background-color: #1b1f21;
  }
`;

const HeroSection = styled.section`
  width: 100%;

  background-position: center;
  background-size: cover;
  position: relative;

  img {
    max-width: 100%;
    width: 100%;
  }

  video {
    &:focus {
      outline: 1px solid transparent;
    }
  }

  .video-react-control-bar,
  .video-react-big-play-button {
    display: none;
  }

  @media (min-width: 1024px) {
    img {
      height: 100vh;
      opacity: 0;
    }
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
    padding: 150px 50px 100px;

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

const VideoMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const LottieSection = styled.section`
  padding: 0 20px 75px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-width: 100%;
    width: 100%;
  }

  .animation,
  .section-info {
    position: relative;
    width: 100%;

    .video-react {
    }
  }

  .section-info {
    h2 {
      font-size: 1.5rem;
      margin-bottom: 40px;
    }
    p {
      font-size: 1rem;
    }
  }

  video {
    &:focus {
      outline: 1px solid transparent;
    }
  }

  .video-react-control-bar {
    display: none;
  }

  @media (min-width: 1024px) {
    padding: 0 50px 150px;
    flex-direction: row;
    justify-content: space-between;

    .animation,
    .section-info {
      width: calc(50% - 10px);
      .video-react {
        max-width: 600px;
        margin: 0 auto;
      }
    }

    .section-info {
      h2 {
        margin-bottom: 60px;
        font-size: 2rem;
      }
      p {
        font-size: 1.33333rem;
      }
      h2,
      p {
        max-width: 45ch;
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
    p,
    strong {
      font-size: 1rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 150px 50px;
    flex-direction: row;
    justify-content: space-between;

    .title-wrapper,
    .section-info {
      width: calc(50% - 10px);

      p,
      strong {
        font-size: 1.33333rem;
      }
      h2,
      p {
        max-width: 45ch;
      }
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

const SliderSection = styled.section`
  .slick-prev,
  .slick-next {
    width: 50px;
    top: 0;
    bottom: 0;
    height: auto;
    z-index: 2;
    transform: translate(0, 0);

    &:before {
      display: block;
      content: "";
      height: 30px;
      width: 30px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .slick-prev {
    left: 0px;
  }
  .slick-next {
    right: 0;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    li button:before {
      font-size: 10px;
      color: white;
      opacity: 0.75;
    }
    li.slick-active button:before {
      font-size: 15px;
      color: white;
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
            _key
            _type
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  return (
    <Layout slimFooter={false}>
      <SEO title="Home" />
      <HomeWrapper>
        <HeroSection
          style={{
            backgroundImage: "url(" + homeData.heroAsset.asset.url + ")",
          }}
        >
          {isImage(homeData.heroAsset.asset.url) ? (
            <img src={homeData.heroAsset.asset.url} alt="Firefly Drone Shows" />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={homeData.heroAsset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </HeroSection>

        <HeroText>
          <h1>{homeData.heroText}</h1>
        </HeroText>

        <LottieSection>
          <aside className="animation">
            <VideoMask />
            <Player
              autoPlay={true}
              loop={true}
              playsInline={true}
              muted={true}
              src={Transition}
              alt="transition"
            />
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

        <SliderSection>
          <Slider {...sliderSettings}>
            {homeData.heroAsset2.map((item) => (
              <img
                key={item._key}
                src={item.asset.url}
                alt="Firefly Drone Shows"
              />
            ))}
          </Slider>
        </SliderSection>

        <TextSection>
          <aside className="title-wrapper">
            {homeData.section2Heading && (
              <h2 className="title">{homeData.section2Heading}</h2>
            )}
          </aside>
          <aside className="section-info">
            {homeData._rawSection2Description && (
              <BlockContent blocks={homeData._rawSection2Description} />
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

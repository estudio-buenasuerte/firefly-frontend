import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
import BlockContent from "@sanity/block-content-to-react";
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  VolumeMenuButton,
} from "video-react";

const HeroSection = styled.section`
  position: relative;
`;

const HeroSectionAsset = styled.img`
  width: 100%;

  @media (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const HeroTitleSection = styled.aside`
  padding: 20px;

  @media (min-width: 1024px) {
    position: absolute;
    left: 0;
    bottom: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 4rem;
    padding-right: 20px;
  }

  @media (min-width: 1400px) {
    font-size: 6rem;
  }
`;

const HeroSubtitle = styled.h2`
  margin: 0.25rem 0 0.5rem;
  font-size: 1rem;

  @media (min-width: 1024px) {
    font-size: 1.33333333rem;
    margin: 0;
    padding-right: 20px;
  }
  color: #d5dee2;
`;

const Step = styled.section`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  padding: 20px;

  @media (min-width: 1024px) {
    margin: 150px 0;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    &:nth-of-type(odd) {
      .step-asset {
        order: 2;
      }
      .step-desc {
        order: 1;
        padding-right: 20px;
      }
    }
    &:nth-of-type(even) {
      .step-asset {
        order: 1;
      }
      .step-desc {
        order: 2;
        padding-left: 20px;
      }
    }

    p {
      font-size: 20px;
    }
  }

  @media (min-width: 1200px) {
    p {
      font-size: 24px;
    }
  }
`;

const StepSectionTitle = styled.h3`
  font-size: 2em;
  padding: 0 0 20px;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 36px;
    padding: 0 0 40px;
  }

  @media (min-width: 1200px) {
    font-size: 66px;
  }
`;

const StepSectionInfo = styled.aside`
  box-sizing: border-box;

  p {
    margin: 0 0 1em;
    max-width: 45ch;
    line-height: 1.25;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const StepSectionAsset = styled.aside`
  padding: 25px 0 50px;
  width: 100%;
  position: relative;

  img {
    max-width: 100%;
    width: 100%;
  }

  .video-react-control-bar,
  .video-react-big-play-button {
    display: none;
  }

  video:focus {
    outline: 1px solid transparent;
  }

  @media (min-width: 1024px) {
    width: 60%;
    padding: 0;
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

const CaseStudy = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityCaseStudy {
        nodes {
          heroAsset {
            asset {
              title
              url
            }
          }
          title
          subtitle
          step1Title
          step1Subtitle
          _rawStep1Description
          step1Asset {
            asset {
              url
              title
              _type
            }
          }
          step2Title
          step2Subtitle
          _rawStep2Description
          step2Asset {
            asset {
              url
              title
              _type
            }
          }
          step3Title
          step3Subtitle
          _rawStep3Description
          step3Asset {
            asset {
              url
              title
              _type
            }
          }
          step4Title
          step4Subtitle
          _rawStep4Description
          step4Asset {
            asset {
              url
              title
              _type
            }
          }
          step5Title
          step5Subtitle
          _rawStep5Description
          step5Asset {
            asset {
              url
              title
              _type
            }
          }
          step6Title
          step6Subtitle
          _rawStep6Description
          step6Asset {
            asset {
              url
              title
              _type
            }
          }
        }
      }
    }
  `);

  const [caseStudy] = useState(data.allSanityCaseStudy.nodes[0]);

  return (
    <Layout>
      <SEO title="Case Study" description="" />
      <HeroSection>
        <HeroSectionAsset src={caseStudy.heroAsset.asset.url} />
        <HeroTitleSection>
          <HeroTitle>{caseStudy.title}</HeroTitle>
          <HeroSubtitle>{caseStudy.subtitle}</HeroSubtitle>
        </HeroTitleSection>
      </HeroSection>

      <Step data-id={caseStudy.step1Title}>
        <StepSectionInfo className="step-desc">
          <StepSectionTitle>{caseStudy.step1Title}</StepSectionTitle>
          <BlockContent blocks={caseStudy._rawStep1Description} />
        </StepSectionInfo>
        <StepSectionAsset className="step-asset">
          {caseStudy.step1Asset.asset.url.split(".")[
            caseStudy.step1Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step1Asset.asset.url.split(".")[
            caseStudy.step1Asset.asset.url.split(".").length - 1
          ] === "png" ||
          caseStudy.step1Asset.asset.url.split(".")[
            caseStudy.step1Asset.asset.url.split(".").length - 1
          ] === "jpg" ? (
            <img
              src={caseStudy.step1Asset.asset.url}
              alt={caseStudy.step1Title}
            />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={caseStudy.step1Asset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </StepSectionAsset>
      </Step>

      <Step data-id={caseStudy.step2Title}>
        <StepSectionInfo className="step-desc">
          <StepSectionTitle>{caseStudy.step2Title}</StepSectionTitle>
          <BlockContent blocks={caseStudy._rawStep2Description} />
        </StepSectionInfo>
        <StepSectionAsset className="step-asset">
          {caseStudy.step2Asset.asset.url.split(".")[
            caseStudy.step2Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step2Asset.asset.url.split(".")[
            caseStudy.step2Asset.asset.url.split(".").length - 1
          ] === "png" ||
          caseStudy.step2Asset.asset.url.split(".")[
            caseStudy.step2Asset.asset.url.split(".").length - 1
          ] === "jpg" ? (
            <img
              src={caseStudy.step2Asset.asset.url}
              alt={caseStudy.step2Title}
            />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={caseStudy.step2Asset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </StepSectionAsset>
      </Step>

      <Step data-id={caseStudy.step3Title}>
        <StepSectionInfo className="step-desc">
          <StepSectionTitle>{caseStudy.step3Title}</StepSectionTitle>
          <BlockContent blocks={caseStudy._rawStep3Description} />
        </StepSectionInfo>
        <StepSectionAsset className="step-asset">
          {caseStudy.step3Asset.asset.url.split(".")[
            caseStudy.step3Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step3Asset.asset.url.split(".")[
            caseStudy.step3Asset.asset.url.split(".").length - 1
          ] === "png" ||
          caseStudy.step3Asset.asset.url.split(".")[
            caseStudy.step3Asset.asset.url.split(".").length - 1
          ] === "jpg" ? (
            <img
              src={caseStudy.step3Asset.asset.url}
              alt={caseStudy.step3Title}
            />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={caseStudy.step3Asset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </StepSectionAsset>
      </Step>

      <Step data-id={caseStudy.step4Title}>
        <StepSectionInfo className="step-desc">
          <StepSectionTitle>{caseStudy.step4Title}</StepSectionTitle>
          <BlockContent blocks={caseStudy._rawStep4Description} />
        </StepSectionInfo>
        <StepSectionAsset className="step-asset">
          {caseStudy.step4Asset.asset.url.split(".")[
            caseStudy.step4Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step4Asset.asset.url.split(".")[
            caseStudy.step4Asset.asset.url.split(".").length - 1
          ] === "png" ||
          caseStudy.step4Asset.asset.url.split(".")[
            caseStudy.step4Asset.asset.url.split(".").length - 1
          ] === "jpg" ? (
            <img
              src={caseStudy.step4Asset.asset.url}
              alt={caseStudy.step4Title}
            />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={caseStudy.step4Asset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </StepSectionAsset>
      </Step>
      <Step data-id={caseStudy.step5Title}>
        <StepSectionInfo className="step-desc">
          <StepSectionTitle>{caseStudy.step5Title}</StepSectionTitle>
          <BlockContent blocks={caseStudy._rawStep5Description} />
        </StepSectionInfo>
        <StepSectionAsset className="step-asset">
          {caseStudy.step5Asset.asset.url.split(".")[
            caseStudy.step5Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step5Asset.asset.url.split(".")[
            caseStudy.step5Asset.asset.url.split(".").length - 1
          ] === "png" ||
          caseStudy.step5Asset.asset.url.split(".")[
            caseStudy.step5Asset.asset.url.split(".").length - 1
          ] === "jpg" ? (
            <img
              src={caseStudy.step5Asset.asset.url}
              alt={caseStudy.step5Title}
            />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={caseStudy.step5Asset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </StepSectionAsset>
      </Step>

      <Step data-id={caseStudy.step6Title}>
        <StepSectionInfo className="step-desc">
          <StepSectionTitle>{caseStudy.step6Title}</StepSectionTitle>
          <BlockContent blocks={caseStudy._rawStep6Description} />
        </StepSectionInfo>
        <StepSectionAsset className="step-asset">
          {caseStudy.step6Asset.asset.url.split(".")[
            caseStudy.step6Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step6Asset.asset.url.split(".")[
            caseStudy.step6Asset.asset.url.split(".").length - 1
          ] === "png" ||
          caseStudy.step6Asset.asset.url.split(".")[
            caseStudy.step6Asset.asset.url.split(".").length - 1
          ] === "jpg" ? (
            <img
              src={caseStudy.step6Asset.asset.url}
              alt={caseStudy.step6Title}
            />
          ) : (
            <>
              <VideoMask />
              <Player
                playsInline
                autoPlay={true}
                loop={true}
                muted={true}
                src={caseStudy.step6Asset.asset.url}
              >
                <ControlBar autoHide={true}>
                  <CurrentTimeDisplay order={4.1} />
                  <VolumeMenuButton disabled />
                </ControlBar>
              </Player>
            </>
          )}
        </StepSectionAsset>
      </Step>
    </Layout>
  );
};

export default CaseStudy;

import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import SEO from "../components/seo";
import styled from "styled-components";
import BlockContent from "@sanity/block-content-to-react";

const HeroSection = styled.section`
  position: relative;
`;
const HeroSectionAsset = styled.img`
  width: 100%;
`;

const HeroTitleSection = styled.aside`
  position: absolute;
  left: 20px;
  bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 6rem;
  margin: 0;
`;

const HeroSubtitle = styled.h2`
  font-size: 1.33333333rem;
  color: #d5dee2;
`;

const Step = styled.section`
  display: flex;
  flex-direction: column;
  margin: 50px 0px;
  padding: 10px;

  @media (min-width: 1024px) {
    padding: 20px;
    margin: 150px 0;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;
const StepSectionTitle = styled.h3`
  font-size: 2em;
  margin: 0;
  @media (min-width: 1024px) {
    width: 25%;
  }
`;

const StepSectionInfo = styled.aside`
  p {
    margin: 0 0 1em;
    max-width: 75ch;
    line-height: 1.25;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const StepSectionAsset = styled.aside`
  padding: 50px 10px;
  width: 100%;
  img {
    max-width: 100%;
    width: 100%;
  }

  @media (min-width: 1024px) {
    padding: 150px 0px 0px;
  }
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
        <StepSectionTitle>{caseStudy.step1Title}</StepSectionTitle>
        <StepSectionInfo>
          <BlockContent blocks={caseStudy._rawStep1Description} />
        </StepSectionInfo>
        <StepSectionAsset>
          {caseStudy.step1Asset.asset.url.split(".")[
            caseStudy.step1Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step1Asset.asset.url.split(".")[
            caseStudy.step1Asset.asset.url.split(".").length - 1
          ] === "png" ? (
            <img
              src={caseStudy.step1Asset.asset.url}
              alt={caseStudy.step1Title}
            />
          ) : (
            ""
          )}
        </StepSectionAsset>
      </Step>
      <Step data-id={caseStudy.step2Title}>
        <StepSectionTitle>{caseStudy.step2Title}</StepSectionTitle>
        <StepSectionInfo>
          <BlockContent blocks={caseStudy._rawStep2Description} />
        </StepSectionInfo>
        <StepSectionAsset>
          {caseStudy.step2Asset.asset.url.split(".")[
            caseStudy.step2Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step2Asset.asset.url.split(".")[
            caseStudy.step2Asset.asset.url.split(".").length - 1
          ] === "png" ? (
            <img
              src={caseStudy.step2Asset.asset.url}
              alt={caseStudy.step2Title}
            />
          ) : (
            ""
          )}
        </StepSectionAsset>
      </Step>
      <Step data-id={caseStudy.step3Title}>
        <StepSectionTitle>{caseStudy.step3Title}</StepSectionTitle>
        <StepSectionInfo>
          <BlockContent blocks={caseStudy._rawStep3Description} />
        </StepSectionInfo>
        <StepSectionAsset>
          {caseStudy.step3Asset.asset.url.split(".")[
            caseStudy.step3Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step3Asset.asset.url.split(".")[
            caseStudy.step3Asset.asset.url.split(".").length - 1
          ] === "png" ? (
            <img
              src={caseStudy.step3Asset.asset.url}
              alt={caseStudy.step3Title}
            />
          ) : (
            ""
          )}
        </StepSectionAsset>
      </Step>
      <Step data-id={caseStudy.step4Title}>
        <StepSectionTitle>{caseStudy.step4Title}</StepSectionTitle>
        <StepSectionInfo>
          <BlockContent blocks={caseStudy._rawStep4Description} />
        </StepSectionInfo>
        <StepSectionAsset>
          {caseStudy.step4Asset.asset.url.split(".")[
            caseStudy.step4Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step4Asset.asset.url.split(".")[
            caseStudy.step4Asset.asset.url.split(".").length - 1
          ] === "png" ? (
            <img
              src={caseStudy.step4Asset.asset.url}
              alt={caseStudy.step4Title}
            />
          ) : (
            ""
          )}
        </StepSectionAsset>
      </Step>
      <Step data-id={caseStudy.step5Title}>
        <StepSectionTitle>{caseStudy.step5Title}</StepSectionTitle>
        <StepSectionInfo>
          <BlockContent blocks={caseStudy._rawStep5Description} />
        </StepSectionInfo>
        <StepSectionAsset>
          {caseStudy.step5Asset.asset.url.split(".")[
            caseStudy.step5Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step5Asset.asset.url.split(".")[
            caseStudy.step5Asset.asset.url.split(".").length - 1
          ] === "png" ? (
            <img
              src={caseStudy.step5Asset.asset.url}
              alt={caseStudy.step5Title}
            />
          ) : (
            ""
          )}
        </StepSectionAsset>
      </Step>
      <Step data-id={caseStudy.step6Title}>
        <StepSectionTitle>{caseStudy.step6Title}</StepSectionTitle>
        <StepSectionInfo>
          <BlockContent blocks={caseStudy._rawStep6Description} />
        </StepSectionInfo>
        <StepSectionAsset>
          {caseStudy.step6Asset.asset.url.split(".")[
            caseStudy.step6Asset.asset.url.split(".").length - 1
          ] === "gif" ||
          caseStudy.step6Asset.asset.url.split(".")[
            caseStudy.step6Asset.asset.url.split(".").length - 1
          ] === "png" ? (
            <img
              src={caseStudy.step6Asset.asset.url}
              alt={caseStudy.step6Title}
            />
          ) : (
            ""
          )}
        </StepSectionAsset>
      </Step>
    </Layout>
  );
};

export default CaseStudy;

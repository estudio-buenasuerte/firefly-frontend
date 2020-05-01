import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import SEO from "../components/seo";
import WorkAsset from "../components/WorkAsset/WorkAsset";

const WorkList = styled.main`
  display: flex;
  flex-direction: column;
  padding: 125px 20px;

  @media (min-width: 1024px) {
    padding: 150px 40px;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Work = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityWork {
        nodes {
          workList {
            asset {
              asset {
                url
                mimeType
              }
            }
            title
            description
            assetLayout
          }
        }
      }
    }
  `);
  const [workList] = useState(data.allSanityWork.nodes[0].workList);

  return (
    <Layout>
      <SEO title="Work" description="" />

      {workList && (
        <WorkList>
          {workList.map((item) => (
            <WorkAsset
              key={item.asset.asset.url}
              asset={{
                type: item.asset.asset.mimeType,
                url: item.asset.asset.url,
                title: item.title,
                description: item.description,
                layout: item.assetLayout,
              }}
              hideControls={false}
            />
          ))}
        </WorkList>
      )}
    </Layout>
  );
};

export default Work;

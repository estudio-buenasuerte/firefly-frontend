import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import styled from 'styled-components';
import SEO from '../components/seo';
import WorkAsset from '../components/WorkAsset/WorkAsset';

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
						_key
						type
						title
						description
						assetLayout
						image {
							asset {
								url
								fluid {
									base64
									aspectRatio
									src
									srcSet
									srcWebp
									srcSetWebp
									sizes
								}
							}
						}
						workMuxVideo {
							_key
						}
					}
					_rawWorkList(resolveReferences: { maxDepth: 100 })
				}
			}
		}
	`);

	const { _rawWorkList, workList } = data.allSanityWork.nodes[0];

	let newList = workList.map(item => {
		return item.workMuxVideo?.hasOwnProperty('_key') ? _rawWorkList.find(raw => raw._key === item._key) : item;
	});

	const [projectList] = useState(newList);

	return (
		<Layout>
			<SEO metaTitle='Work' description='' />

			{projectList && (
				<WorkList>
					{projectList.map(item => {
						return (
							<WorkAsset
								key={item._key}
								asset={{
									type: item?.type,
									image: item?.image?.asset,
									title: item.title,
									description: item.description,
									layout: item.assetLayout,
									video: item?.workMuxVideo?.asset,
								}}
							/>
						);
					})}
				</WorkList>
			)}
		</Layout>
	);
};

export default Work;

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			allSanityStoryBoard {
				nodes {
					title
					name
					slug {
						current
					}
					hero {
						asset {
							fluid {
								base64
								aspectRatio
								src
								srcSet
								srcWebp
								srcSetWebp
								sizes
							}
							url
						}
					}
					content: _rawContent(resolveReferences: { maxDepth: 15 })
					seo {
						_key
						metaTitle
						metaKeywords
						metaDescription
						openGraphTitle
						openGraphDescription
						openGraphImage {
							asset {
								url
							}
						}
						twitterTitle
						twitterDescription
						twitterImage {
							asset {
								url
							}
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		throw result.errors;
	}

	const storyboards = result.data.allSanityStoryBoard.nodes || [];

	storyboards.forEach(post => {
		createPage({
			path: `/storyboards/${post.slug.current}`,
			component: require.resolve('./src/templates/StoryBoard.jsx'),
			context: post,
		});
	});
};

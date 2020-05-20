require('dotenv').config();
module.exports = {
	siteMetadata: {
		title: `Firefly Drone Shows`,
		description: `Firefly provides an immersive experience that takes our client's events and brands to new heights. One of the only FAA licensed companies in the world, Firefly offers the latest technology operated by the most experienced pilots.`,
		author: `Buena Suerte Studio <info@buena-suerte.studio>`,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-112748982-1',
				head: true,
				anonymize: true,
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-styled-components`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Firefly Drone Shows`,
				short_name: `Firefly Drone Shows`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/favicon/drone.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
				dataset: process.env.REACT_APP_SANITY_DATASET,
				token: process.env.REACT_APP_SANITY_API_TOKEN,
			},
		},
		`gatsby-plugin-sass`,
	],
};

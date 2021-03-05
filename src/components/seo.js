import React from 'react';
import Helmet from 'react-helmet';

export default ({
	metaTitle = 'Firefly Drone Shows',
	metaDescription,
	metaKeywords,
	openGraphTitle = 'Firefly Drone Shows',
	openGraphDescription,
	openGraphImage,
	twitterTitle = 'Firefly Drone Shows',
	twitterDescription,
	twitterImage,
	pathname = '/',
	siteName = 'Firefly Drone Shows',
	siteUrl = 'https://www.fireflydroneshows.com',
}) => (
	<Helmet>
		{metaTitle && <title>{metaTitle}</title>}
		{metaDescription && <meta name='description' content={metaDescription} />}
		<meta name='keywords' content={metaKeywords} />

		<meta property='og:url' content={`${siteUrl}${pathname}`} />
		<meta property='og:title' content={openGraphTitle} />
		<meta property='og:site_name' content={siteName} />
		<meta property='og:description' content={openGraphDescription} />
		{openGraphImage && <meta property='og:image' content={`${openGraphImage.asset.url}?w=1200&h=630`} />}

		<meta name='twitter:card' content='summary_large_image' />
		<meta name='twitter:title' content={twitterTitle} />
		<meta name='twitter:description' content={twitterDescription} />
		<meta name='twitter:url' content={`${siteUrl}${pathname}`} />
		{twitterImage && <meta name='twitter:image:src' content={`${twitterImage.asset.url}?w=1200&h=630`} />}
	</Helmet>
);

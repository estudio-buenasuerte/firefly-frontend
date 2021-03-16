import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Logo from '../../images/site-logo.svg';
import SanityMuxPlayer from 'sanity-mux-player';

const StoryboardHero = ({ title, name, hero, heroVideo }) => {
	return (
		<section className='storyboard__hero'>
			<Link to={'/'} className='storyboard__header'>
				<img src={Logo} alt='Firefly Logo' />
			</Link>
			{heroVideo ? (
				<SanityMuxPlayer
					assetDocument={heroVideo.asset}
					autoload={true}
					autoplay={true}
					showControls={false}
					muted={false}
					loop={true}
					playsInline={true}
					className='storyboard__hero-video'
				/>
			) : (
				<Img fluid={hero.asset.fluid} />
			)}
			<div className='storyboard__hero-info'>
				<p className='storyboard__client'>Firefly x {name}</p>
				<p className='storyboard__title'>{title}</p>
			</div>
		</section>
	);
};

export default StoryboardHero;

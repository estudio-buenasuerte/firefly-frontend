import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Logo from '../../images/site-logo.svg';

const StoryboardHero = ({ title, name, hero }) => {
	return (
		<section className='storyboard__hero'>
			<Link to={'/'} className='storyboard__header'>
				<img src={Logo} alt='Firefly Logo' />
			</Link>
			<Img fluid={hero.asset.fluid} />
			<p className='storyboard__client'>Firefly x {name}</p>
			<p className='storyboard__title'>{title}</p>
		</section>
	);
};

export default StoryboardHero;

import React, { useEffect } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import '../styles/storyboards.scss';
import SEO from '../components/seo';
import StoryboardHero from '../components/Storyboards/StoryboardHero';
import StoryboardMediaModule from '../components/Storyboards/StoryboardMediaModule';
import StoryboardTextModule from '../components/Storyboards/StoryboardTextModule';

const Storyboard = ({ pageContext }) => {
	const { content = [] } = pageContext;

	useScrollPosition(({ prevPos, currPos }) => {
		const header = document.querySelector('.storyboard__header');

		if (currPos.y < prevPos.y) {
			header.classList.add('scroll-down');
			header.classList.remove('scroll-up');
		} else {
			header.classList.remove('scroll-down');
			header.classList.add('scroll-up');
		}

		if (currPos.y === 0) {
			header.classList.remove('scroll-up');
			header.classList.remove('scroll-down');
		}
	});

	useEffect(() => {
		document.body.style.background = `#E6E6E5`;
		return () => {
			document.body.style.background = `#000000`;
		};
	}, []);

	return (
		<React.Fragment>
			<SEO title={pageContext.name} />
			<main className='storyboard'>
				<StoryboardHero title={pageContext.title} name={pageContext.name} hero={pageContext.hero} />
				{content.map((section, index) => {
					return section._type === 'storyboardText' ? (
						<StoryboardTextModule index={index} key={section._key} {...section} />
					) : (
						<StoryboardMediaModule index={index} key={section._key} {...section} />
					);
				})}
			</main>
		</React.Fragment>
	);
};
export default Storyboard;

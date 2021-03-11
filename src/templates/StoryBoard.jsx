import React, { useEffect, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import '../styles/storyboards.scss';
import SEO from '../components/seo';
import StoryboardHero from '../components/Storyboards/StoryboardHero';
import StoryboardMediaModule from '../components/Storyboards/StoryboardMediaModule';
import StoryboardTextModule from '../components/Storyboards/StoryboardTextModule';
import { Transition } from 'react-transition-group';
import Cookies from 'js-cookie';

export const TRANSITION_DURATION = 400;

const TRANSITION_STYLES = {
	default: {
		transition: `opacity ${TRANSITION_DURATION}ms ease, transform ${TRANSITION_DURATION}ms ease`,
	},
	entering: {
		opacity: 0,
	},
	entered: {
		opacity: 1,
	},
	exiting: {
		opacity: 0,
	},
	exited: {
		opacity: 0,
	},
};

const Storyboard = ({ pageContext }) => {
	const { content = [], seo, password, slug } = pageContext;
	const [passwordCorrect, setPasswordCorrect] = useState(false);
	const [error, setError] = useState(null);
	const [typedPassword, setTypedPassword] = useState(null);

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
		const visited = Cookies.get(`storyboard_${slug.current}`);

		if (visited === 'true') {
			setPasswordCorrect(true);
		}
		document.body.style.background = `#E6E6E5`;

		return () => {
			document.body.style.background = `#000000`;
		};
	}, []);

	return (
		<React.Fragment>
			<SEO metaTitle={pageContext.name} {...seo} />
			<Transition in={!passwordCorrect} mountOnEnter unmountOnExit appear timeout={TRANSITION_DURATION}>
				{status => (
					<div
						className='storyboard__password'
						style={{
							...TRANSITION_STYLES.default,
							...TRANSITION_STYLES[status],
						}}>
						<form className='storyboard__password-form'>
							<label>
								<input
									type='text'
									name='password'
									placeholder='Enter Project Password'
									onChange={e => setTypedPassword(e.target.value)}
								/>
							</label>
							<button
								type='submit'
								onClick={event => {
									event.preventDefault();
									if (typedPassword === password) {
										Cookies.set(`storyboard_${slug.current}`, true, { expires: 1 });
										setPasswordCorrect(true);
									} else {
										setPasswordCorrect(false);
										setError('Please enter the correct password');
									}
								}}>
								Submit
							</button>
						</form>
						{error && <p className='storyboard__error'>{error}</p>}
					</div>
				)}
			</Transition>
			{/* {!passwordCorrect && (
				<div className='storyboard__password'>

				</div>
			)} */}

			<Transition in={passwordCorrect} mountOnEnter unmountOnExit appear timeout={TRANSITION_DURATION}>
				{status => (
					<main
						className='storyboard'
						style={{
							...TRANSITION_STYLES.default,
							...TRANSITION_STYLES[status],
						}}>
						<StoryboardHero title={pageContext.title} name={pageContext.name} hero={pageContext.hero} />
						{content.map((section, index) => {
							return section._type === 'storyboardText' ? (
								<StoryboardTextModule index={index} key={section._key} {...section} />
							) : (
								<StoryboardMediaModule index={index} key={section._key} {...section} />
							);
						})}
					</main>
				)}
			</Transition>
		</React.Fragment>
	);
};
export default Storyboard;

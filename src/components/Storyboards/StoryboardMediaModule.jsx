import React, { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import cx from 'classnames';
import 'video-react/dist/video-react.css';
import SanityMuxPlayer from 'sanity-mux-player';
import { SwitchTransition, Transition } from 'react-transition-group';

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

const SLIDE_TRANSITION_STYLES = {
	default: {
		transition: `opacity 200ms ease`,
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

const StoryboardMediaModule = ({ title, description, index, layout, lightbox, media = [] }) => {
	const [isLightboxOpen, setLightBoxOpen] = useState(false);
	const [currentSlide, setCurrentSlide] = React.useState(0);

	const goNext = () => {
		let nextIndex = currentSlide + 1;

		if (nextIndex >= media.length) {
			nextIndex = 0;
		}

		setCurrentSlide(nextIndex);
	};

	const goBack = () => {
		let nextIndex = currentSlide - 1;

		if (nextIndex < 0) {
			nextIndex = media.length - 1;
		}

		setCurrentSlide(nextIndex);
	};

	const keyboardListener = event => {
		console.log(event.code);
		switch (event.code) {
			case 'ArrowLeft':
				goBack();
				break;
			case 'ArrowRight':
				goNext();
				break;
			case 'Escape':
				setLightBoxOpen(false);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (isLightboxOpen) {
			window.addEventListener('keydown', keyboardListener);
		}
		return () => {
			window.removeEventListener('keydown', keyboardListener);
		};
	}, [isLightboxOpen, currentSlide]);

	return (
		<React.Fragment>
			<section
				className={cx('storyboard__section storyboard__section--media', {
					'border-top': index > 0,
				})}>
				<p className='storyboard__section-title'>{title}</p>
				{description && (
					<div className='storyboard__section-description'>
						<BlockContent blocks={description} />
					</div>
				)}
				<ul
					className={cx('storyboard__section-media', {
						[layout]: layout,
					})}>
					{media.map((item, index) => {
						const { _type } = item;

						return (
							<li
								key={item._key}
								className={cx('storyboard__section-media-item', {
									[layout]: layout,
									[_type]: _type,
									'lightbox-enabled': lightbox,
								})}
								onClick={() => {
									if (lightbox) {
										setLightBoxOpen(true);
										setCurrentSlide(index);
									}
								}}>
								{lightbox && (
									<span className='storyboard__section-media-index'>
										{index < 11 ? `0${index + 1}` : index + 1}
									</span>
								)}
								{_type === 'storyboardImage' ? (
									<div className='img-wrapper'>
										<picture>
											<source
												srcSet={`${item.image.asset.url}?w=1600&auto=format`}
												media='(min-width: 1000px)'
											/>
											<source
												srcSet={`${item.image.asset.url}?w=1000&auto=format`}
												media='(min-width: 600px)'
											/>
											<img
												alt={item?.title}
												src={`${item.image.asset.url}?w=400&auto=format`}
												className=''
											/>
										</picture>
									</div>
								) : (
									<SanityMuxPlayer
										assetDocument={item.video.asset}
										autoload={true}
										autoplay={true}
										showControls={false}
										muted={false}
										loop={true}
										playsInline={true}
									/>
								)}
							</li>
						);
					})}
				</ul>
			</section>
			<Transition in={isLightboxOpen} mountOnEnter unmountOnExit appear timeout={TRANSITION_DURATION}>
				{status => (
					<div
						className='storyboard__modal'
						style={{
							...TRANSITION_STYLES.default,
							...TRANSITION_STYLES[status],
						}}>
						<p className='storyboard__modal-index'>
							{currentSlide < 11 ? `0${currentSlide + 1}` : currentSlide + 1}
						</p>
						<button
							className='storyboard__modal-close'
							onClick={() => {
								setCurrentSlide(0);
								setLightBoxOpen(false);
							}}>
							<svg
								width='25'
								height='25'
								viewBox='0 0 25 25'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M2.24182 0.292969L0.292969 2.24182L10.3441 12.293L0.292969 22.3441L2.24182 24.293L12.293 14.2418L22.3441 24.293L24.293 22.3441L14.2418 12.293L24.293 2.24182L22.3441 0.292969L12.293 10.3441L2.24182 0.292969Z'
									fill='white'
								/>
							</svg>
						</button>
						<button
							onClick={goBack}
							className='storyboard__modal-navigation storyboard__modal-navigation--left'>
							<svg
								width='20'
								height='33'
								viewBox='0 0 20 33'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M20 4.30567L16.1943 0.5L0 16.6943L16.1943 32.8887L20 29.083L7.63833 16.6943L20 4.30567Z'
									fill='white'
								/>
							</svg>
						</button>
						<button
							onClick={goNext}
							className='storyboard__modal-navigation storyboard__modal-navigation--right'>
							<svg
								width='21'
								height='33'
								viewBox='0 0 21 33'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M4.24805 0.5L0.442383 4.30567L12.8041 16.6943L0.442383 29.083L4.24805 32.8887L20.4424 16.6943L4.24805 0.5Z'
									fill='white'
								/>
							</svg>
						</button>
						<SwitchTransition>
							<Transition
								key={media[currentSlide]._key}
								mountOnEnter
								unmountOnExit
								appear
								timeout={TRANSITION_DURATION}>
								{status => (
									<article
										className={cx('storyboard__modal-slide')}
										style={{
											...SLIDE_TRANSITION_STYLES.default,
											...SLIDE_TRANSITION_STYLES[status],
										}}>
										{media[currentSlide]._type === 'storyboardImage' ? (
											<picture>
												<source
													srcSet={`${media[currentSlide].image.asset.url}?w=1600&auto=format`}
													media='(min-width: 1000px)'
												/>
												<source
													srcSet={`${media[currentSlide].image.asset.url}?w=1000&auto=format`}
													media='(min-width: 600px)'
												/>
												<img
													alt={media[currentSlide]?.title}
													src={`${media[currentSlide].image.asset.url}?w=400&auto=format`}
													className=''
												/>
											</picture>
										) : (
											<SanityMuxPlayer
												assetDocument={media[currentSlide].video.asset}
												autoload={true}
												autoplay={true}
												showControls={true}
												muted={false}
												loop={true}
												playsInline={true}
											/>
										)}
										{media[currentSlide].title && (
											<p className='storyboard__modal-title'>{media[currentSlide].title}</p>
										)}
									</article>
								)}
							</Transition>
						</SwitchTransition>
					</div>
				)}
			</Transition>
		</React.Fragment>
	);
};

function ArrowLeft(props) {
	const disabeld = props.disabled ? ' arrow--disabled' : '';
	return (
		<svg
			onClick={props.onClick}
			className={'arrow arrow--left' + disabeld}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'>
			<path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
		</svg>
	);
}

function ArrowRight(props) {
	const disabeld = props.disabled ? ' arrow--disabled' : '';
	return (
		<svg
			onClick={props.onClick}
			className={'arrow arrow--right' + disabeld}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'>
			<path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
		</svg>
	);
}

export default StoryboardMediaModule;

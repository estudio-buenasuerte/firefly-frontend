import React from 'react';
import styled from 'styled-components';
import 'video-react/dist/video-react.css';
import SanityMuxPlayer from 'sanity-mux-player';

const AssetWrapper = styled.article`
	width: 100%;
	padding: 0 0 20px;
	font-family: 'Zwizz';

	img {
		padding-bottom: 20px;
	}

	img,
	video {
		max-width: 100%;
		width: 100%;
		&:focus {
			outline: 1px solid transparent;
		}
	}

	.video-react {
		position: relative;
		margin-bottom: 20px;
		font-family: 'Zwizz' !important;
		&:focus {
			outline: 1px solid transparent;
		}

		.video-react-big-play-button {
			display: none;
		}

		.video-react-control-bar {
			position: absolute;
			bottom: 5px;
			display: flex;
			background-color: transparent;
			padding: 0 10px;
			align-items: center;

			.video-react-icon-fullscreen {
				margin-left: auto;
			}
			.video-react-play-control {
				background-color: transparent;
				color: white;
				border: 0;
				padding: 0;
				font-family: 'Zwizz' !important;

				&:before {
					position: initial;
					text-shadow: none;
				}
				&:hover {
					&:before {
						text-shadow: none;
					}
				}

				&.video-react-paused {
					&:before {
						font-size: 14px;
						content: 'Play';
						@media (min-width: 1024px) {
							font-size: 18px;
						}
					}
				}
				&.video-react-playing {
					&:before {
						font-size: 14px;
						content: 'Pause';
						@media (min-width: 1024px) {
							font-size: 18px;
						}
					}
				}
			}
		}
	}

	@media (min-width: 1024px) {
		box-sizing: border-box;
		padding: 0 10px 40px;
		&.one-quarter {
			width: 25%;
		}
		&.two-quarter {
			width: 50%;
		}
		&.three-quarter {
			width: 75%;
		}
		&.four-quarter {
			width: 100%;
		}

		.video-react-control-bar {
			bottom: 10px;
			font-size: 18px;
			padding: 0 20px;
		}
	}
`;

const Title = styled.p`
	margin: 0 0 10px;
	color: white;
	font-size: 18px;
`;

const SubTitle = styled.p`
	margin: 0;
	color: #d5dee2;
	font-size: 14px;
	@media (min-width: 1024px) {
		font-size: 18px;
		padding-right: 20px;
		box-sizing: border-box;
	}
`;

const WorkAsset = ({ asset }) => {
	const isVideo = asset.type === 'video';

	return (
		<AssetWrapper className={asset.layout}>
			{asset && (
				<React.Fragment>
					{isVideo ? (
						<SanityMuxPlayer
							assetDocument={asset.video}
							autoload={true}
							autoplay={true}
							showControls={true}
							muted={false}
							loop={true}
						/>
					) : (
						<img src={asset.imageUrl} alt={asset.title ? asset.title : ''} />
					)}
				</React.Fragment>
			)}
			{asset.title && <Title>{asset.title}</Title>}
			{asset.description && <SubTitle>{asset.description}</SubTitle>}
		</AssetWrapper>
	);
};
export default WorkAsset;

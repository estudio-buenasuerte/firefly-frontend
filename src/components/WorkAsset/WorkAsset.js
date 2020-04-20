import React from "react";
import {
  Player,
  ControlBar,
  CurrentTimeDisplay,
  VolumeMenuButton,
} from "video-react";
import styled from "styled-components";
import "video-react/dist/video-react.css";

const AssetWrapper = styled.article`
  width: 100%;
  padding: 0 0 20px;
  font-family: "Zwizz";

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
    font-family: "Zwizz" !important;
    &:focus {
      outline: 1px solid transparent;
    }

    .video-react-big-play-button {
      display: none;
    }

    .video-react-control-bar {
      position: absolute;
      bottom: 10px;
      display: flex;
      background-color: transparent;

      padding: 0 20px;
      align-items: center;
      font-size: 18px;

      .video-react-icon-fullscreen {
        margin-left: auto;
      }
      .video-react-play-control {
        background-color: transparent;
        color: white;
        border: 0;
        padding: 0;
        font-family: "Zwizz" !important;

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
            font-size: 18px;
            content: "Play";
          }
        }
        &.video-react-playing {
          &:before {
            font-size: 18px;
            content: "Pause";
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
  }
`;

const Title = styled.p`
  margin: 0 0 10px;
  color: white;
  font-size: 18px;

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.p`
  margin: 0;
  color: #d5dee2;
  font-size: 14px;
  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const WorkAsset = ({ asset, hideControls, autoPlay }) => {
  const isAssetImage = asset.type === "image/jpeg";

  return (
    <AssetWrapper className={asset.layout}>
      {asset && (
        <React.Fragment>
          {isAssetImage ? (
            <img src={asset.url} alt={asset.title ? asset.title : ""} />
          ) : (
            <Player
              playsInline={true}
              autoPlay={autoPlay || false}
              loop={true}
              muted={false}
              src={asset.url}
            >
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <VolumeMenuButton disabled />
              </ControlBar>
            </Player>
          )}
        </React.Fragment>
      )}
      {asset.title && <Title>{asset.title}</Title>}
      {asset.description && <SubTitle>{asset.description}</SubTitle>}
    </AssetWrapper>
  );
};
export default WorkAsset;

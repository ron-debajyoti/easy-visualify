import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import PlayWidget from './Widget';

import { Div } from './Reusables';
import { isInvalidInput } from '../utils/Utility';

// const WidgetTitle = Div`
//   margin: 5px 20px;
//   font-size: medium;
//   text-align: left;
//   color: white;
// `;

// const WidgetWrapper = Div`
//   display: inline;
//   padding: 0.7em;
// `;

const OrderedList = styled.ol`
  ${media.lessThan('medium')`
  `}

  ${media.greaterThan('medium')`
  `}
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const songObject = {
  uri: PropTypes.string.isRequired,
  popularity: PropTypes.number,
  viewCoverArt: PropTypes.bool.isRequired,
};

const propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(songObject)), PropTypes.string])
  ),
  contentType: PropTypes.string.isRequired,
  isUpdated: PropTypes.bool.isRequired,
};

const SongRenderer = (props) => {
  const { content, contentType, isUpdated } = props;
  if (content.length >= 2) {
    const populateCards1 = content[0].map((element) => (
      <PlayWidget type="song" key={element.uri} uri={element.uri} />
    ));
    const populateCards2 = content[1].map((element) => (
      <PlayWidget type="song" key={element.uri} uri={element.uri} />
    ));

    const populateCards3 = !isInvalidInput(content[2]) ? (
      <PlayWidget type="playlist" key={content[2]} uri={content[2]} />
    ) : (
      <div />
    );

    const populateCards4 = !isInvalidInput(content[3]) ? (
      <PlayWidget type="playlist" key={content[3]} uri={content[3]} />
    ) : (
      <div />
    );

    if (contentType === 'top') {
      /* for the Daily Top playlists */
      if (content[0].length > 0) {
        return (
          <Div
            className="div-list-top-tracks"
            display="flex"
            fontSize="medium"
            color="white"
            margin="5px 20px"
            flexDirection="column"
            justifyContent="center"
          >
            <Div display="flex" padding="0.7em" color="white" justifyContent="center">
              {' '}
              Daily Top Tracks of {content[4]}{' '}
            </Div>

            <OrderedList>{populateCards1}</OrderedList>
          </Div>
        );
      }
      return (
        <Div
          className="div-list-no-tracks"
          display="flex"
          fontSize="medium"
          color="white"
          margin="5px 20px"
        >
          <Div display="flex" padding="0.7em" color="white" style={{ fontSize: '1em' }}>
            Spotify doesn&apos;t have the data yet. Try Radar Tracks
          </Div>
        </Div>
      );
    }
    if (contentType === 'viral') {
      /* for the Daily Viral playlists */
      if (content[1].length > 0) {
        return (
          <Div
            className="div-list-viral-tracks"
            display="flex"
            fontSize="medium"
            color="white"
            margin="5px 20px"
            flexDirection="column"
            justifyContent="center"
          >
            <Div display="flex" padding="0.7em" color="white" justifyContent="center">
              {' '}
              Daily Viral Tracks of {content[4]}{' '}
            </Div>
            <OrderedList>{populateCards2}</OrderedList>
          </Div>
        );
      }
      return (
        <Div
          className="div-list-no-tracks"
          display="flex"
          fontSize="medium"
          color="white"
          margin="5px 20px"
        >
          <Div display="flex" padding="0.7em" color="white" style={{ fontSize: '1em' }}>
            {' '}
            Spotify doesn&apos;t have the data yet. Try Radar Tracks{' '}
          </Div>
        </Div>
      );
    }
    if (contentType === 'weekly') {
      /* for the Weekly Top playlists */
      if (content[3].length > 0) {
        return (
          <Div
            className="div-list-weekly-tracks"
            display="flex"
            fontSize="medium"
            color="white"
            margin="5px 20px"
            flexDirection="column"
            justifyContent="center"
          >
            <Div display="flex" padding="0.7em" color="white" justifyContent="center">
              {' '}
              Weekly Top Tracks of {content[4]}{' '}
            </Div>
            <div>{populateCards4}</div>
          </Div>
        );
      }
      return (
        <Div
          className="div-list-no-tracks"
          display="flex"
          fontSize="medium"
          color="white"
          margin="5px 20px"
        >
          <Div display="flex" padding="0.7em" color="white" style={{ fontSize: '1em' }}>
            {' '}
            Spotify doesn&apos;t have the data yet. Try Radar Tracks{' '}
          </Div>
        </Div>
      );
    }
    /* For the Radar playlists */
    if (content[2].length > 0) {
      return (
        <Div
          className="div-list-radar-tracks"
          display="flex"
          fontSize="medium"
          color="white"
          margin="5px 20px"
          flexDirection="column"
          justifyContent="center"
        >
          <Div display="flex" padding="0.7em" color="white" justifyContent="center">
            {' '}
            Radar Tracks of {content[4]}{' '}
          </Div>
          <div>{populateCards3}</div>
        </Div>
      );
    }
    return (
      <Div
        className="div-list-no-tracks"
        display="flex"
        fontSize="medium"
        color="white"
        margin="5px 20px"
      >
        <Div display="flex" padding="0.7em" color="white" style={{ fontSize: '1em' }}>
          {' '}
          Spotify doesn&apos;t have the data yet. Try other Tracks{' '}
        </Div>
      </Div>
    );
  }

  if (content.length === 1 && content[0].length === 0) {
    if (isUpdated) {
      return (
        <Div display="flex" padding="0.7em" color="white">
          {' '}
          Click on a country to begin!{' '}
        </Div>
      );
    }
    return <Div />;
  }
  return (
    <Div display="flex" padding="0.7em" color="white">
      {' '}
      Spotify is not supported in {content[0]} !
    </Div>
  );
};

SongRenderer.propTypes = propTypes;
SongRenderer.defaultProps = {
  content: [],
};

export default memo(SongRenderer);

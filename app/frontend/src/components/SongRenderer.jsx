import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import PlayWidget from './Widget';

const WidgetTitle = styled.div`
  ${media.lessThan('medium')`
    font-size: small;
  `}

  ${media.greaterThan('medium')`
    font-size: large;
  `}
  margin: 30px 20px
  text-align: left;
  color: white;
`;

const WidgetWrapper = styled.div`
  display: inline;
  padding: 0.7em;
`;

const OrderedList = styled.ol`
  ${media.lessThan('medium')`
    display: inline flow-root list-item;
  `}

  ${media.greaterThan('medium')`
    display: 'inline list-item'
  `}
`;

const songObject = {
  uri: PropTypes.string.isRequired,
  popularity: PropTypes.number,
  viewCoverArt: PropTypes.bool.isRequired,
};

const propTypes = {
  content: PropTypes.arrayOf(PropTypes.arrayOf(songObject)).isRequired,
  contentType: PropTypes.string.isRequired,
};

const SongRenderer = (props) => {
  const { content, contentType } = props;
  if (content.length >= 2) {
    const populateCards1 = content[0].map((element) => (
      <PlayWidget type="song" key={element.uri} uri={element.uri} />
    ));
    const populateCards2 = content[1].map((element) => (
      <PlayWidget type="song" key={element.uri} uri={element.uri} />
    ));
    const populateCards3 = content[2].map((element) => (
      <PlayWidget type="song" key={element.uri} uri={element.uri} />
    ));
    const populateCards4 = <PlayWidget type="album" key={content[3]} uri={content[3]} />;

    if (contentType === 'top') {
      if (content[0].length > 0) {
        return (
          <WidgetWrapper>
            <WidgetTitle> Daily Top Tracks of {content[4]} </WidgetTitle>

            <OrderedList>{populateCards1}</OrderedList>
          </WidgetWrapper>
        );
      }
      return (
        <WidgetTitle>
          <WidgetTitle style={{ fontSize: '1em' }}>
            Spotify doesn&apos;t have the data yet. Try Radar Tracks
          </WidgetTitle>
        </WidgetTitle>
      );
    }
    if (contentType === 'viral') {
      if (content[1].length > 0) {
        return (
          <WidgetWrapper>
            <WidgetTitle> Daily Viral Tracks of {content[4]} </WidgetTitle>
            <OrderedList>{populateCards2}</OrderedList>
          </WidgetWrapper>
        );
      }
      return (
        <WidgetTitle>
          <WidgetTitle style={{ fontSize: '1em' }}>
            {' '}
            Spotify doesn&apos;t have the data yet. Try Radar Tracks{' '}
          </WidgetTitle>
        </WidgetTitle>
      );
    }
    if (contentType === 'weekly') {
      if (content[4].length > 0) {
        return (
          <WidgetWrapper>
            <WidgetTitle> Weekly Top Tracks of {content[4]} </WidgetTitle>
            <OrderedList>{populateCards4}</OrderedList>
          </WidgetWrapper>
        );
      }
      return (
        <WidgetTitle>
          <WidgetTitle style={{ fontSize: '1em' }}>
            {' '}
            Spotify doesn&apos;t have the data yet. Try Radar Tracks{' '}
          </WidgetTitle>
        </WidgetTitle>
      );
    }
    if (content[2].length > 0) {
      return (
        <WidgetWrapper>
          <WidgetTitle> Radar Tracks of {content[4]} </WidgetTitle>
          <div>{populateCards3}</div>
        </WidgetWrapper>
      );
    }
    return (
      <WidgetTitle>
        <WidgetTitle style={{ fontSize: '1em' }}>
          {' '}
          Spotify doesn&apos;t have the data yet. Try other Tracks{' '}
        </WidgetTitle>
      </WidgetTitle>
    );
  }

  if (content.length === 0) {
    return <WidgetTitle> Click on a country to begin! </WidgetTitle>;
  }
  return <WidgetTitle> Spotify is not supported in {content[0]} !</WidgetTitle>;
};

SongRenderer.propTypes = propTypes;

export default memo(SongRenderer);

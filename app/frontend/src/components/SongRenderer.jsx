import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import PlayWidget from './Widget';

const WidgetTitle = styled.div`
  font-size: 1em;
  margin: 30px 10px
  text-align: left;
  color: white;
`;

const WidgetWrapper = styled.div`
  display: inline;
  padding: 0.7em;
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
      <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />
    ));
    const populateCards2 = content[1].map((element) => (
      <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />
    ));
    const populateCards3 = content[2].map((element) => (
      <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />
    ));

    if (contentType === 'top') {
      if (content[0].length > 0) {
        return (
          <WidgetWrapper>
            <WidgetTitle> Top 10 Tracks of {content[3]} </WidgetTitle>

            <ol style={{ display: 'inline list-item' }}>{populateCards1}</ol>
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
            <WidgetTitle> Viral 10 Tracks of {content[3]} </WidgetTitle>
            <ol style={{ display: 'inline list-item' }}>{populateCards2}</ol>
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
          <WidgetTitle> Radar Tracks of {content[3]} </WidgetTitle>
          <ol style={{ display: 'inline list-item' }}>{populateCards3}</ol>
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

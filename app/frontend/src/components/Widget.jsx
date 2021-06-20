import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import media from 'styled-media-query';

const Embed = styled.embed`
  ${media.lessThan('medium')`
    width: 250px;
    height: 70px;
  `}
  ${media.greaterThan('medium')`
    width: 250px;
    height: 70px;
  `}
`;

const Album = styled.iframe`
  min-width: 35vh;
  min-height: 100vh;
`;

const propTypes = {
  uri: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool,
  title: PropTypes.string,
};

const PlayWidget = (props) => {
  const { title, type, uri, lightTheme } = props;
  const src =
    type === 'song'
      ? `https://open.spotify.com/embed?uri=${uri}${lightTheme ? `&theme=white` : ''}`
      : `https://open.spotify.com/embed/playlist/${uri}`;

  if (type === 'song') {
    return <Embed title={title} src={src} />;
  }
  return <Album title={title} src={src} />;
};

PlayWidget.propTypes = propTypes;
PlayWidget.defaultProps = {
  lightTheme: true,
  title: '',
};

export default PlayWidget;

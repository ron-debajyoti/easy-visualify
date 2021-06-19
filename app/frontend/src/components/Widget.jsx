import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import media from 'styled-media-query';

const Embed = styled.embed`
  ${media.lessThan('medium')`
    width: 150px;
    height: 50px;
  `}
  ${media.greaterThan('medium')`
    width: 250px;
    height: 70px;
  `}
`;

const propTypes = {
  uri: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool,
  title: PropTypes.string,
};

const PlayWidget = (props) => {
  const { title, uri, lightTheme } = props;
  const src = 'https://open.spotify.com/embed?uri=' + `${uri}${lightTheme ? '&theme=white' : ''}`;

  return <Embed title={title} src={src} />;
};

PlayWidget.propTypes = propTypes;
PlayWidget.defaultProps = {
  lightTheme: true,
  title: '',
};

export default PlayWidget;

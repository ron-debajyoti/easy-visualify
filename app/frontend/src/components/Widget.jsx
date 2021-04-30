import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
  lightTheme: PropTypes.bool,
  viewCoverArt: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

const PlayWidget = (props) => {
  const { width, title, height, uri, lightTheme, viewCoverArt } = props;
  const src =
    'https://open.spotify.com/embed?uri=' +
    `${uri}${lightTheme ? '&theme=white' : ''}` +
    `${viewCoverArt ? '&view=coverart' : ''}`;

  return <embed title={title} src={src} width={width} height={height} />;
};

PlayWidget.propTypes = propTypes;
PlayWidget.defaultProps = {
  lightTheme: '&theme=white',
  viewCoverArt: '&view=coverart',
};

export default PlayWidget;

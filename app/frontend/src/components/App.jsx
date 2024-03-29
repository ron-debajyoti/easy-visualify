import React, { Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from 'react-simple-maps';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import PropTypes from 'prop-types';
import * as util from '../utils/Utility';
import { weeklyPlaylists, radarPlaylists } from '../utils/Playlists';
import countries from '../utils/Countries';
import mapData from '../data/map.json';
import loadingGif from '../images/loading2.gif';

import '../css/styles.css';
import '../css/App.css';

// setting styled macros
const Header = styled.div`
  ${media.lessThan('medium')`
    font-size: small;
  `}

  ${media.lessThan('medium')`
    font-size: medium;
  `}

  color: white;
`;

const Gif = styled.img`
  max-width: 100%;
  margin: 10px;
`;

// defining props outside the class like Typescript
const propTypes = {
  setTooltipContent: PropTypes.func.isRequired,
  setTooltip: PropTypes.func.isRequired,
};

//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: null,
      dataFetch: false,
    };
  }

  componentDidMount() {
    util.fetchData().then((playlists) => {
      this.setState(() => ({
        playlists,
        dataFetch: true,
      }));
    });
  }

  renderDataOnClick = (geo, setTooltipContent) => {
    const { NAME, CONTINENT } = geo.properties;
    const countryObj = countries.filter((c) => c.country === NAME || c.continent === CONTINENT)[0];
    const { playlists } = this.state;
    if (countryObj === undefined) {
      // spotify data doesn't exist
      setTooltipContent([NAME]);
    } else if (countryObj.country_code === 'Africa' && countryObj.country !== 'South Africa') {
      /* 
          Most of the African countries other than South Africa doesn't have the
          Top 10 and the Viral 10 tracks data yet. For the time being we pass an empty 
          array data for both of them and the Radar Playlist tracks. 
          This is not a good approach but I shall definitely try for a better logic in
          the future. 
        */
      const radarPlaylist = radarPlaylists.filter(
        (c) => c.country_code === countryObj.country_code
      );

      const finalData = [[], []]; // daily top and daily viral
      finalData.push([radarPlaylist[0].uri]);
      finalData.push([]); // weekly top
      finalData.push([NAME]);
      setTooltipContent(finalData);
    } else {
      /*
          This is for the rest of the countries which have the Top10 and
          Viral 10 playlists data available to us.
        */
      let dataObj1 = []; // top10 playlists array
      let dataObj2 = []; // viral10 playlists array

      if (playlists[0].topPlaylists.length > 0) {
        const o = playlists[0].topPlaylists.filter(
          (c) => c.country_code === countryObj.country_code
        );
        if (o[0] !== undefined && o[0].data.length > 0) {
          dataObj1 = o[0].data;
        }
      }

      if (playlists[1].viralPlaylists.length > 0) {
        const ob = playlists[1].viralPlaylists.filter(
          (c) => c.country_code === countryObj.country_code
        );
        if (ob[0] !== undefined && ob[0].data.length > 0) {
          dataObj2 = ob[0].data;
        }
      }

      const weeklyPlaylist = weeklyPlaylists.filter(
        (c) => c.country_code === countryObj.country_code
      );
      /*
          Many countries still do not have the Radar playlists data available yet
        */

      const radarPlaylist = radarPlaylists.filter(
        (c) => c.country_code === countryObj.country_code
      );

      const finalData1 = [];
      const finalData2 = [];

      dataObj1.forEach((element) => {
        if (element.track !== null && element.track !== undefined) {
          const obj = {};
          obj.uri = element.track.uri;
          obj.popularity = element.track.popularity;
          obj.viewCoverArt = true;
          finalData1.push(obj);
        }
      });

      dataObj2.forEach((element) => {
        if (element.track !== null && element.track !== undefined) {
          const obj = {};
          obj.uri = element.track.uri;
          obj.popularity = element.track.popularity;
          obj.viewCoverArt = true;
          finalData2.push(obj);
        }
      });

      const finalData = [];
      finalData.push(finalData1);
      finalData.push(finalData2);
      finalData.push(radarPlaylist.length > 0 ? [radarPlaylist[0].uri] : []);
      finalData.push(weeklyPlaylist.length > 0 ? [weeklyPlaylist[0].uri] : []);
      finalData.push([NAME]);
      setTooltipContent(finalData);
    }
  };

  render() {
    /* The render function of the class App  */

    const { dataFetch } = this.state;
    if (dataFetch) {
      const { setTooltipContent, setTooltip } = this.props;
      return (
        <div className="app-map-div">
          <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
            <ZoomableGroup zoom={1}>
              <Geographies geography={mapData}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => this.renderDataOnClick(geo, setTooltipContent)}
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        setTooltip(NAME);
                      }}
                      onMouseLeave={() => {
                        setTooltip('');
                      }}
                      style={{
                        default: { fill: '#CFD8DC' },
                        hover: {
                          fill: '#F53',
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#E42',
                          outline: 'none',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      );
    }
    return (
      <div>
        <Header>Map data is loading and rendering...</Header>
        <Gif src={loadingGif} alt="loading..." />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default memo(App);

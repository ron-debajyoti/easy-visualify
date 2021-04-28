import React, { Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from 'react-simple-maps';
import PropTypes from 'prop-types';
import * as util from '../utils/Utility';
import countries from '../utils/Countries';

import '../css/styles.css';
import '../css/App.css';

// const geoUrl ="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

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

      console.log('fetched data!');
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
      const dataObj3 = playlists[2].radarPlaylists.filter(
        (c) => c.country_code === countryObj.country_code
      )[0].data;

      const finalData3 = [];
      dataObj3.forEach((element) => {
        const obj = {};
        obj.uri = element.track.uri;
        obj.popularity = element.track.popularity;
        obj.viewCoverArt = true;
        finalData3.push(obj);
      });
      const finalData = [[], []];
      finalData.push(finalData3);
      finalData.push([NAME]);
      setTooltipContent(finalData);
    } else {
      /*
          This is for the rest of the countries which have the Top10 and
          Viral 10 playlists data available to us.
        */
      let dataObj1 = [];
      let dataObj2 = [];
      let dataObj3 = [];

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

      /*
          Many countries still do not have the Radar playlists data available yet
        */
      if (playlists[2].radarPlaylists.length > 0) {
        // Filtering the country from the list of playlists
        const obj = playlists[2].radarPlaylists.filter(
          (c) => c.country_code === countryObj.country_code
        );

        // Checking if the Radar playlist for that country exists
        if (obj[0] !== undefined && obj[0].data.length > 0) {
          dataObj3 = obj[0].data;
        }
      }

      const finalData1 = [];
      const finalData2 = [];
      const finalData3 = [];

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

      if (dataObj3.length > 0) {
        dataObj3.forEach((element) => {
          if (element.track !== null && element.track !== undefined) {
            const obj = {};
            obj.uri = element.track.uri;
            obj.popularity = element.track.popularity;
            obj.viewCoverArt = true;
            finalData3.push(obj);
          }
        });
      }

      const finalData = [];
      finalData.push(finalData1);
      finalData.push(finalData2);
      finalData.push(finalData3);
      finalData.push([NAME]);
      setTooltipContent(finalData);
    }
  };

  render() {
    const { dataFetch } = this.state;

    if (dataFetch) {
      const { setTooltipContent, setTooltip } = this.props;
      return (
        <div>
          <ComposableMap data-tip="" projectionConfig={{ scale: 150 }}>
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
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
    return <div>Map data is loading and rendering. Please wait.</div>;
  }
}

App.propTypes = propTypes;

export default memo(App);

import React, { Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as util from './utils/Utility'
import countries from './utils/Countries'
import PropTypes from 'prop-types'

import "./css/styles.css";
import './css/App.css';

//const geoUrl ="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"



class App extends Component{

  static propTypes = {
    setTooltipContent:PropTypes.func.isRequired
  }

  state = {
    playlists : null,
    dataFetch : false
  }



  componentDidMount(){
   util.fetchData()
    .then( (playlists) => {
      this.setState(() => ({
        playlists : playlists,
        dataFetch : true
      }))

      console.log("fetched data!")
    })
  }






  renderDataOnClick = (geo,setTooltipContent) => {
    const {NAME,CONTINENT} = geo.properties
    var countryObj = countries.filter((c) => {
      return c.country === NAME || c.continent === CONTINENT
    })[0]
    
    if(countryObj === undefined){
      // spotify data doesn't exist
      setTooltipContent([NAME])

    }
    else{
      // spotify data does exist !
      if(countryObj.country_code === 'Africa' && countryObj.country !== 'South Africa'){ 
        /* 
          Most of the African countries other than South Africa doesn't have the
          Top 10 and the Viral 10 tracks data yet. For the time being we pass an empty 
          array data for both of them and the Radar Playlist tracks. 
          This is not a good approach but I shall definitely try for a better logic in
          the future. 
        */
        var dataObj3 = this.state.playlists[2].radarPlaylists.filter((c) => {
          return c.country_code === countryObj.country_code
        })[0].data

        var finalData3 = []
        dataObj3.forEach(element => {
          var obj = {}
          obj['uri'] = element.track.uri
          obj['popularity'] = element.track.popularity
          obj['viewCoverArt'] = true
          finalData3.push(obj)
        })
        var finalData = [[],[]]
        finalData.push(finalData3)
        finalData.push([NAME])
        setTooltipContent(finalData)
      } else {
        /*
          This is for the rest of the countries which have all the Top10 and
          Viral 10 playlists data available to us.
        */
        var dataObj1 = this.state.playlists[0].topPlaylists.filter((c) => {
          return c.country_code === countryObj.country_code
        })[0].data
      
        var dataObj2 = this.state.playlists[1].viralPlaylists.filter((c) => {
          return c.country_code === countryObj.country_code
        })[0].data
  
        if (this.state.playlists[2].radarPlaylists.length > 0){
          var dataObj3 = this.state.playlists[2].radarPlaylists.filter((c) => {
            return c.country_code === countryObj.country_code
          })[0].data
        } else {
          var dataObj3 = []
        }
  
        var finalData1 = []
        var finalData2 = []
        var finalData3 = []
  
        dataObj1.forEach(element => {
          var obj = {}
          obj['uri'] = element.track.uri
          obj['popularity'] = element.track.popularity
          obj['viewCoverArt'] = true
          finalData1.push(obj)
        })
  
        dataObj2.forEach(element => {
          var obj = {}
          obj['uri'] = element.track.uri
          obj['popularity'] = element.track.popularity
          obj['viewCoverArt'] = true
          finalData2.push(obj)
        })
  
        dataObj3.forEach(element => {
          var obj = {}
          obj['uri'] = element.track.uri
          obj['popularity'] = element.track.popularity
          obj['viewCoverArt'] = true
          finalData3.push(obj)
        })
  
        // console.log(dataObj3)
        var finalData = []
        finalData.push(finalData1)
        finalData.push(finalData2)
        finalData.push(finalData3)
        finalData.push([NAME])
        setTooltipContent(finalData)
      }
    }
  }
  
  render() {

    const {setTooltipContent,setTooltip} = this.props
    if(this.state.dataFetch){
      return(
        <div>
          <ComposableMap data-tip="" projectionConfig={{scale:150}}>
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => this.renderDataOnClick(geo,setTooltipContent)}
                      onMouseEnter={() => {
                        const {NAME,CONTINENT} = geo.properties
                        setTooltip(NAME,CONTINENT)
                      }}
                      onMouseLeave={() => {
                        setTooltip("");
                      }}
                      style={{
                        default: { fill: "#CFD8DC" },
                        hover: {
                          fill: "#F53",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      )
    } else {
      return (
        <div>
          Map Data is loading and rendering. Please wait.
        </div>
      )
    }
  }

  
// end of App class
}
export default memo(App);

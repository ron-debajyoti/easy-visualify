import React, { useState, Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as util from './utils/Utility'
import countries from './utils/Countries'
import PropTypes from 'prop-types'

import "./styles.css";
import './App.css';

//const geoUrl ="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"



class App extends Component{

  static propTypes = {
    setTooltipContent:PropTypes.func.isRequired
  }

  state = {
    playlists : null
  }



  componentDidMount(){
   util.fetchData()
    .then( (playlists) => {
      this.setState(() => ({
        playlists
      }))

      console.log("fetched data!")
    })
  }






  renderDataOnClick = (geo,setTooltipContent) => {
    const {NAME} = geo.properties
    var countryObj = countries.filter((c) => {
      return c.country === NAME
    })[0]

    if(countryObj === undefined){
      // spotify data doesn't exist
      setTooltipContent([NAME])

    }
    else{
      // spotify data does exist !

      var dataObj1 = this.state.playlists[0].topPlaylists.filter((c) => {
        return c.country_code === countryObj.country_code
      })[0].data

      var dataObj2 = this.state.playlists[1].viralPlaylists.filter((c) => {
        return c.country_code === countryObj.country_code
      })[0].data

      var finalData1 = []
      var finalData2 = []

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

      var finalData = []
      finalData.push(finalData1)
      finalData.push(finalData2)
      finalData.push([NAME])
      setTooltipContent(finalData)
    }
  }
  


  render() {

    const {setTooltipContent,setTooltip} = this.props

    return(
      <div>
        <ComposableMap data-tip="" projectionConfig={{scale:175}}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => this.renderDataOnClick(geo,setTooltipContent)}
                    onMouseEnter={() => {
                      const {NAME} = geo.properties
                      setTooltip(NAME)
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
  }

  
// end of App class
}
export default memo(App);

import React, { useState, Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as util from './utils/Utility'
import countries from './utils/Countries'
import PropTypes from 'prop-types'

import "./styles.css";

//const geoUrl ="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


import './App.css';







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

      console.log("fetched!")
    })
  }



  renderTooltip = (geo,setTooltipContent) => {
    const {NAME} = geo.properties
    var countryObj = countries.filter((c) => {
      return c.country === NAME
    })[0]

    if(countryObj === undefined){
      // spotify data doesn't exist
      setTooltipContent("")

    }
    else{
      var dataObj = this.state.playlists.filter((c) => {
        return c.country_code === countryObj.country_code
      })[0].data

      var finalData = []

      dataObj.forEach(element => {
        var obj = {}
        obj['uri'] = element.track.uri
        obj['popularity'] = element.track.popularity
        obj['viewCoverArt'] = true
        finalData.push(obj)
      })

      console.log(finalData)
      setTooltipContent(finalData)
    }
  }
  


  render() {

    const {setTooltipContent} = this.props

    return(
      <div>
        <ComposableMap data-tip="" projectionConfig={{scale:200}}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => this.renderTooltip(geo,setTooltipContent)}
                    onMouseLeave={() => {
                      setTooltipContent("");
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

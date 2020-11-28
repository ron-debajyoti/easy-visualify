import React, { Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as util from '../utils/Utility'
import countries from '../utils/Countries'
import PropTypes from 'prop-types'

import "../css/styles.css";
import '../css/App.css';

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
          This is for the rest of the countries which have the Top10 and
          Viral 10 playlists data available to us.
        */
        var dataObj1 = []
        var dataObj2 = []
        dataObj3 = []


        if (this.state.playlists[0].topPlaylists.length > 0){
          var o = this.state.playlists[0].topPlaylists.filter((c) => {
            return c.country_code === countryObj.country_code
          })
          if (o[0] !== undefined && o[0].data.length > 0){
            dataObj1 = o[0].data
          }
        }
        
        if (this.state.playlists[1].viralPlaylists.length > 0){
          var ob = this.state.playlists[1].viralPlaylists.filter((c) => {
            return c.country_code === countryObj.country_code
          })
          if (ob[0] !== undefined && ob[0].data.length > 0){
            dataObj2 = ob[0].data
          }
        }
  
        /*
          Many countries still do not have the Radar playlists data available yet
        */
        if (this.state.playlists[2].radarPlaylists.length > 0){
          // Filtering the country from the list of playlists 
          var obj = this.state.playlists[2].radarPlaylists.filter((c) => {
            return c.country_code === countryObj.country_code
          })

          // Checking if the Radar playlist for that country exists
          if (obj[0] !== undefined && obj[0].data.length > 0){
            dataObj3 = obj[0].data
          }
        }
  
        var finalData1 = []
        var finalData2 = []
        finalData3 = []
  
        dataObj1.forEach(element => {
          if(element.track === null || element.track === undefined){
            
          }else{
            var obj = {}
            obj['uri'] = element.track.uri
            obj['popularity'] = element.track.popularity
            obj['viewCoverArt'] = true
            finalData1.push(obj)
          }
        })
  
        dataObj2.forEach(element => {
          if(element.track === null || element.track === undefined){
            
          }else{
            var obj = {}
            obj['uri'] = element.track.uri
            obj['popularity'] = element.track.popularity
            obj['viewCoverArt'] = true
            finalData2.push(obj)
          }
        })

        if (dataObj3.length > 0){
          dataObj3.forEach(element => {
            if(element.track === null || element.track === undefined){
            }else{
              var obj = {}
              obj['uri'] = element.track.uri
              obj['popularity'] = element.track.popularity
              obj['viewCoverArt'] = true
              finalData3.push(obj)
            }
          })
        }
      
        finalData = []
        finalData.push(finalData1)
        finalData.push(finalData2)
        finalData.push(finalData3)
        finalData.push([NAME])
        setTooltipContent(finalData)
      }
    }
  }
  
  render() {
    if(this.state.dataFetch){
      const {setTooltipContent,setTooltip} = this.props
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
    } else {
      return (
        <div>
          Map data is loading and rendering. Please wait.
        </div>
      )
    }
  }

  
// end of App class
}
export default memo(App);

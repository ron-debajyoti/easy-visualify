import React, { useState, Component, memo } from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as util from './utils/Utility'
import ReactTooltip from "react-tooltip";

import "./styles.css";

//const geoUrl ="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


import './App.css';
const mapStyles = {
  width: "90%",
  height: "auto",
}


class App extends Component{

  state = {
    playlists : []
  }

  componentDidMount(){
   util.fetchData()
    .then( (playlists) => {
      console.log(playlists)
      console.log(this.playlists)
      this.setState(() => {
        playlists
      })
    })
  }


  render() {
  return(
    <div>
      <ComposableMap>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  // onMouseEnter={() => {
                  //   const { NAME, POP_EST } = geo.properties;
                  //   setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  // }}
                  // onMouseLeave={() => {
                  //   setTooltipContent("");
                  // }}
                  style={{
                    default: { fill: "#CFD8DC" }
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

  

}



// const App = ({ setTooltipContent }) => {

//   return (
//     <div>
//       <ComposableMap>
//         <ZoomableGroup zoom={1}>
//           <Geographies geography={geoUrl}>
//             {({ geographies }) =>
//               geographies.map(geo => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   // onMouseEnter={() => {
//                   //   const { NAME, POP_EST } = geo.properties;
//                   //   setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
//                   // }}
//                   // onMouseLeave={() => {
//                   //   setTooltipContent("");
//                   // }}
//                   style={{
//                     default: { fill: "#CFD8DC" }
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//         </ZoomableGroup>
//       </ComposableMap>
//     </div>
//   );
// }

export default App;

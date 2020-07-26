import React, {useState} from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom';
import Entry from './Entry'
import App from './App'


function AppBuild() {
  const [content, setContent] = useState("");
  return (
    <div>
      <App>setTooltipContent={setContent}</App> 
      <ReactTooltip> {content} </ReactTooltip>
    </div>
  );
}

// ReactDOM.render(
//   <BrowserRouter>
//     <Entry />
//   </BrowserRouter>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <AppBuild />,
  document.getElementById('root')
)
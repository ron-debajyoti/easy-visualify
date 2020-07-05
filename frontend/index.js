import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import App from './frontend/App';

// function AppBuild() {
//   const [content, setContent] = useState("");
//   return (
//     <div>
//       <App>setTooltipContent={setContent}</App> 
//     </div>
//   );
// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

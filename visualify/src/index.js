import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from "react-tooltip";
import App from './frontend/App';

function AppBuild() {
  const [content, setContent] = useState("");
  return (
    <div>
      <App setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

ReactDOM.render(
  <AppBuild />,
  document.getElementById('root')
);

import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom';
import App from './App'
import { Button } from 'react-bootstrap';
import PlayWidget from './Widget'

// function AppBuild() {
//   const [content, setContent] = useState("");

//   return (
//     <div>
//       <App setTooltipContent={setContent} /> 
//       <ReactTooltip>{content}</ReactTooltip>
//     </div>
//   );
// }

class AppBuild extends Component{
  state = {
    content : "start"
  }


  onUpdate = (content,isValid) => {
    this.setState(() => ({
      content
      })
    )
  }


  IsValidData = () => {
    if (this.state.content.length === 5){
      return (
        <li>
          <PlayWidget width={100} height={100} uri={this.state.content[0].uri} />
          <PlayWidget width={100} height={100} uri={this.state.content[1].uri} />
          <PlayWidget width={100} height={100} uri={this.state.content[2].uri} />
          <PlayWidget width={100} height={100} uri={this.state.content[3].uri} />
          <PlayWidget width={100} height={100} uri={this.state.content[4].uri} />
        </li>

      )
    }
    else{
      return (<div></div>)
    }
  }

  render(){
    return(
      <div> 
        <App setTooltipContent={(e) => this.onUpdate(e)} />
        <ReactTooltip>{<this.IsValidData />}</ReactTooltip>
      </div>

      // <div>
      //   <PlayWidget width={300} 
      //       height={380} 
      //       //uri={this.state.content[0].uri} 
      //       uri={"spotify:track:0OgGn1ofaj55l2PcihQQGV"}
      //       lightTheme={false} />
      // </div>

    );
  }

  // end of AppBuild Class
}



ReactDOM.render(
  <AppBuild />,
  document.getElementById('root')
)
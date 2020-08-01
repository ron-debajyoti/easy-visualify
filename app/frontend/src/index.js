import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import ReactDOM from 'react-dom';
import App from './App'
import { Button } from 'react-bootstrap';
import PlayWidget from './Widget'





class AppBuild extends Component{
  state = {
    content : "s",
    contentType : 'top'
  }

  componentDidMount(){
    
  }


  onUpdate = (content) => {
    this.setState(() => ({
      content
      })
    )
    console.log("updated state !")
    console.log(this.state.contentType)
    console.log(this.state.content)
  }


  onButtonClick = (type) => {
      this.setState(() => ({
        contentType : type
      }))
  }


  IsValidData = () => {
    if (this.state.content.length >=2 ){
      console.log(this.state.content[0][0].uri)
      console.log(this.state.content[0][1].uri)
      if(this.state.contentType === "top"){
        return (
          <div id='playlistWidget'>
            <div> Top 10 Playlists </div> 
            <ol> 
              <PlayWidget width={300} height={100} uri={this.state.content[0][0].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][1].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][2].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][3].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][4].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][5].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][6].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][7].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[0][8].uri} />
            </ol>
          </div>
        )
      }
      else{
        return (
          <div>
            <div> Viral 10 Playlists </div>
            <ol >
              <PlayWidget width={300} height={100} uri={this.state.content[1][0].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][1].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][2].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][3].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][4].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][5].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][6].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][7].uri} />
              <PlayWidget width={300} height={100} uri={this.state.content[1][8].uri} />
            </ol>
          </div>
        )
      }
    }
    else{
      return (<div> Spotify is not supported in that country !</div>)
    }
  }

  render(){
    return(
      <div id='wrapper'> 
        <div id='button'>
          <Button className="Top10" onClick={() => this.onButtonClick("top")}> View Top 10 </Button>
          <Button className="Viral10" onClick={() => this.onButtonClick("viral")}> View Viral 10 </Button>
        </div>
        <App setTooltipContent={(e) => this.onUpdate(e)} />
       {/* <ReactTooltip>{<this.IsValidData />}</ReactTooltip> */}
        <this.IsValidData />
      </div>
    );
  }

  // end of AppBuild Class
}



ReactDOM.render(
  <AppBuild />,
  document.getElementById('root')
)
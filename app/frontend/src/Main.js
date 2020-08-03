import React, {Component} from 'react';
import App from './App'
import { Button } from 'react-bootstrap';
import PlayWidget from './Widget'
import {Link} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

class Main extends Component{
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

    // tooltipRender = (content) => {
    //     console.log("!!!!")
    //     console.log(content)
    //     this.render(
    //         <div>
    //             <ReactTooltip>{content}</ReactTooltip>
    //         </div>
    //     )
    // }
  
  
    IsValidData = () => {
      if (this.state.content.length >=2 ){
        // console.log(this.state.content[0][0].uri)
        // console.log(this.state.content[0][1].uri)
        if(this.state.contentType === "top"){
          return (
            <div id='playlistWidget'>
              <div> Top 10 Playlists of {this.state.content[2]} </div> 
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
              <div> Viral 10 Playlists of {this.state.content[2]} </div>
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
        return (<div> Spotify is not supported in {this.state.content[0]} !</div>)
      }
    }
  
    render(){
      return(
        <Link to='/main'>
        <div id='wrapper'> 
            <div id='button'>
            <Button className="Top10" onClick={() => this.onButtonClick("top")}> View Top 10 </Button>
            <Button className="Viral10" onClick={() => this.onButtonClick("viral")}> View Viral 10 </Button>
            </div>
            <App setTooltipContent={(e) => this.onUpdate(e)} />
            <this.IsValidData />
        </div>
        </Link>
      );
    }
  
    // end of Main Class
  }


  export default Main;
  
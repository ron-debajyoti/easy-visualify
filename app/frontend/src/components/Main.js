import React, {Component} from 'react'
import App from './App'
import PlayWidget from './Widget'
import {Link} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components/macro'
import UserModal from './UserModal'
import * as util from '../utils/Utility'
import Cookies from 'js-cookie'
var _ = require('lodash')

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 0.75em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

const TriggerButton = styled(Button)`
  float: right;
`


const ButtonWrapper = styled.div`
  display: inline-block;
  background: white;
`

const Wrapper = styled.div`
  background-color: white; 
`



const WidgetTitle = styled.div`
  font-size: 1.5em;
  float: center;
  margin: 50px 10px
  text-align: left;
  color: palevioletred;
  background-color: white;
`

const WidgetWrapper = styled.div`
  padding: 1em;
  background : aquamarine
  float: right;
`




class Main extends Component{
    state = {
      content : "s",
      country : "None",
      contentType : 'top',
      user : {
        display_name: null,
        country: null,
        followers: null,
        images:null,
        external_urls: null,
        product: null,
        topTracks: null,
        topArtists: null,
        recommendedGenre: null,
        userPlaylists: null,
      },
      allUpdated :false
    }
  
    componentDidMount(){
      // let accessToken = queryString.parse(window.location.search)['?access_token']
      // console.log(queryString.parse(window.location.search))
      // console.log(accessToken)
      var access_token = Cookies.get('access_token')
      Promise.all(
        [util.fetchUserData(access_token)
        .then(data => {
          this.setState(() => ({
            ...this.state,
            user : {
              ...this.state.user,
              display_name: data.display_name,
              country: data.country,
              followers: data.followers.total,
              external_urls: data.external_urls,
              images: data.images,
              product:data.product
            }
          }))
        }),
        util.fetchTopTracks(access_token)
          .then(data => {
            this.setState(() => ({
              ...this.state,
              user : {
                ...this.state.user,
                topTracks : data.items
              }
            }))
          }),     
        util.fetchUserPlaylists(access_token)
          .then(data => {
            this.setState(() => ({
              ...this.state,
              user : {
                ...this.state.user,
                userPlaylists: data.items
              }
            }))
          }),
        util.fetchTopArtists(access_token)
          .then(data => {
            this.setState(() => ({
              ...this.state,
              user : {
                ...this.state.user,
                topArtists : data
              }
            }))
          })
          .then(() => this.updateGenre())
          .then(genre => {
            this.setState(() => ({
              ...this.state,
              user : {
                ...this.state.user,
                recommendedGenre : genre
              }
            }))
          })
        ])
      .then(() => {
        this.setState(() => ({
          ...this.state,
          allUpdated : true
        }))
      })
      
    }
  
  
    updateGenre = async () => {
        var genre = []
        this.state.user.topArtists.items.slice(0,15).map(artist => {
          var temp = artist.genres
          genre = genre.concat(temp)
          genre = _.uniq(genre)
        })
        return genre
    }



    onUpdate = (content) => {
      this.setState(() => ({
        content
        })
      )
      console.log("updated state !")
      // console.log(this.state.contentType)
      // console.log(this.state.content)
    }
  
  
    onButtonClick = (type) => {
        this.setState(() => ({
          contentType : type
        }))
    }

    tooltipRender = (content) => {
        // console.log("!!!!")
        // console.log(content)
        this.setState(() => ({
          country:content
        }))
    }
  
  
    IsValidData = () => {
      if (this.state.content.length >=2 ){
        var populateCards1 = this.state.content[0].map( element => <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />)
        var populateCards2 = this.state.content[1].map( element => <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />)
        var populateCards3 = this.state.content[2].map( element => <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />)

        if(this.state.contentType === "top"){
          if(this.state.content[0].length > 0){
            return (
              <WidgetWrapper>
                <WidgetTitle> Top 10 Tracks of {this.state.content[3]} </WidgetTitle>
                
                <ol> 
                 {populateCards1}
                </ol>
              </WidgetWrapper>
            )
          } else {
            return (
            <WidgetTitle>
              <WidgetTitle style={{'fontSize':'1em'}}> Spotify doesn't have the data yet.
               Try Radar Tracks   </WidgetTitle>
            </WidgetTitle>
            )
          }
        } else {
          if(this.state.contentType === "viral"){
            if (this.state.content[1].length > 0){
              return (
                <WidgetWrapper>
                  <WidgetTitle> Viral 10 Tracks of {this.state.content[3]} </WidgetTitle>
                  <ol >
                    {populateCards2}
                  </ol>
                </WidgetWrapper>
              )
            } else {
              return (
                <WidgetTitle>
                  <WidgetTitle style={{'fontSize':'1em'}}> Spotify doesn't have the data yet.
                   Try Radar Tracks </WidgetTitle>
                </WidgetTitle>
                )
            }
          } else {
            if (this.state.content[2].length > 0){
              return (
                <WidgetWrapper>
                  <WidgetTitle> Radar Tracks of {this.state.content[3]} </WidgetTitle>
                  <ol >
                    {populateCards3}
                  </ol>
                </WidgetWrapper>
              )
            } else {
              return (
                <WidgetTitle>
                  <WidgetTitle style={{'fontSize':'1em'}}> Spotify doesn't have the data yet.
                   Try other Tracks </WidgetTitle>
                </WidgetTitle>
                )
            }

          }
        }
      }
      else{
        if(this.state.content[0] === 's'){
          return (<WidgetTitle> Click on a country to begin! </WidgetTitle>)
        }
        return (<WidgetTitle> Spotify is not supported in {this.state.content[0]} !</WidgetTitle>)
      }
    }
  
    render() {
      if(this.state.allUpdated){
        return(
          <Wrapper> 
              {/* {console.log(this.state.user)} */}
              <h1 style={{'textAlign' :'center'}}>Welcome</h1>
              <UserModal userObject={this.state.user} />
              <Link to='/main'>
                <App setTooltipContent={(e) => this.onUpdate(e)} setTooltip={this.tooltipRender}/>
              </Link>
              <ButtonWrapper>
                <TriggerButton className="Top10" onClick={() => this.onButtonClick("top")}> View Top 10 Tracks</TriggerButton>
                <TriggerButton className="Viral10" onClick={() => this.onButtonClick("viral")}> View Viral 10 Tracks </TriggerButton>
                <TriggerButton className="Radar" onClick={() => this.onButtonClick("radar")}> View Radar Tracks </TriggerButton>
              </ButtonWrapper>
              <this.IsValidData />
              <ReactTooltip>{this.state.country}</ReactTooltip>
          </Wrapper>  
        );
      }
      else{
        console.log('okay page is loading')
        return(
          <h3 style={{'textAlign':'center'}}>Loading ... </h3>
        )
      }
      
    }


  
    // end of Main Class
  }


  export default Main;
  
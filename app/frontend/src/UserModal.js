import React,{Component} from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Cookies from 'js-cookie'
import * as util from './utils/Utility'
import {Radar} from 'react-chartjs-2'
var _ = require('lodash')

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.5em 1em;
    border: 2px solid black;
    border-radius: 3px;
    float: right;
    bottom: 0;
`

const Img = styled.img`
  float: left;
  border-radius : 100%;
  width: 450%;
  height: auto;
  margin: 5px
`

const Wrapper = styled.div`
     display: inline-block;
`


const UserTemplate = styled.div`
    width: 20px;
    height: 5px;
`
const NoUserTemplate = styled.div`
    border: 2px solid currentColor;
    border-radius: 100%;
    padding: 20px;
`

const UserName = styled.a`
    &:hover;
    &:focus{
      color:red;
    }
`

const Name = styled.h1`
    font-size: 1.5em;
    font-weight: 50;
    float: left;
    margin: 20px 0 0;
`

const ChartTitle = styled.h3`
    text-align : center;
`

const Number = styled.div`
  color: black;
  font-weight: 500;
  font-size: 15px;
`;

const NumberLabel = styled.div`
    color: black;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 15px
`

const Stat = styled.div`
    text-align: center;
    display: inline-block;
`

const Stats = styled.div`
    display: flex;
    margin-top: 20px;
`

const Artist = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    &:hover;
`
const ArtistArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  min-width: 30px;
  margin-right: 15px;
  img {
    width: 30px;
    min-width: 30px;
    height: 30px;
    margin-right: 15px;
    border-radius: 100%;
  }
`;

const ArtistName = styled.div`
  flex-grow: 1;
  a {
    color: black;
    text-decoration: none;
  }
  span {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      color: black;
      border-bottom: 1px solid white;
    }
  }
`;

const Heading = styled.div`
  display: inline-block;
  float : left;
  justify-content: space-between;
  margin: 40px 50px
  h3 {
    display: inline-block;
    margin: 10;
  }
`
const MinorWrapper = styled.section`
  display: flex;
  width: 70%;
  justify-content: center;
  margin-top: 100px;
  overflow: auto;
`

class UserModal extends Component {
    constructor () {
      super();
      this.state = {
        showModal: false,
        chartData : null
      };
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.visualTrackData = this.visualTrackData.bind(this);
      this.renderChart = this.renderChart.bind(this);
    }

    static propTypes = {
      userObject: PropTypes.object.isRequired
    }

    componentDidMount(){
      this.renderChart()
    }
    
    


    visualTrackData = () => {
      var access_token = Cookies.get('access_token')
      var datatype = {
        "danceability": 0,
        "energy": 0,
        "speechiness": 0,
        "acousticness": 0,
        "instrumentalness": 0,
        "liveness": 0,
        "valence": 0,
        "tempo": 0
      }
      var template = {
        'name': null,
        'description': null,
        'tracks': [],
        'trackAnalysis':null,
        'count': 0
      }

      return Promise.all( 
        this.props.userObject.topTracks.map(track => 
          util.fetchAudioFeatures(access_token,track.id)
          .then(response => {
            // console.log(response)
            for (let [key,value] of Object.entries(response)){
              datatype[key] = datatype[key]+value/30
            }
            return datatype
          })
        ).concat(
        this.props.userObject.userPlaylists.map(playlist => {
          if(playlist.owner.display_name === this.props.userObject.display_name){
            var offset= 0
            var playlistTemp = JSON.parse(JSON.stringify(template))
            playlistTemp.name = playlist.name
            playlistTemp.description = playlist.description

            var checker = async (access_token,playlist,offset) => {
              if(offset < playlist.tracks.total){
                return util.fetchTracksfromPlaylists(access_token,playlist.href,offset)
                  .then(response => {
                    playlistTemp.tracks = playlistTemp.tracks.concat(response.items)
                    //console.log(playlistTemp.tracks)
                    offset += 100
                  })
                  .then(() => checker(access_token,playlist,offset))
              }
              else{
                return playlistTemp
              }
            }
            return checker(access_token,playlist,offset)
              .then(() => {
                playlistTemp.count = playlistTemp.tracks.length
                // console.log(playlistTemp)
                return playlistTemp
              })
          }
          // else{
          //   return null
          // }
        })
        )
      ).then(data => {
        var topSongsData = data.slice(0,1)
        var playlistData = data.slice(30,data.length)

        var pd = playlistData.map(async playlist => {
          if(playlist !== undefined){
            var datatype = {
              "danceability": 0,
              "energy": 0,
              "speechiness": 0,
              "acousticness": 0,
              "instrumentalness": 0,
              "liveness": 0,
              "valence": 0,
              "tempo": 0
            }
            var template = {
              'name': playlist.name,
              'description': playlist.description,
              'trackData': null
            }
            //our batchsize = 100 tracks
            //our timeout = 1000ms
            var f = async (arrayTracks) => 
                util.fetchAudioFeaturesForMultipleTracks(access_token,arrayTracks)
                  .then(response => {
                    return response.audio_features.map(r => {
                      for (let [key,value] of Object.entries(r)){
                        datatype[key] = datatype[key]+value/playlist.count
                      }
                      return datatype
                    }) 
                  })
            

            //looping across the playlist.track in batches of 100 to avoid API rate limit exceeded error 
            var i,j, chunk=100;
            let promises = []
            for(i=0; j=playlist.tracks.length, i<j; i+=chunk){
              let block = playlist.tracks.slice(i,i+chunk).map(t=> t.track.id).join()
              promises.push(f(block)
                .then(response => {
                  response = response.slice(0,1)[0]
                  template.trackData = JSON.parse(JSON.stringify(response))
                  return template
                }))
              }
            return Promise.all(promises)
          }
        })
        
        return Promise.all(pd)
          .then(data => data.filter( item => item !==undefined))
          .then(data => data.map(item => item[0]))
          .then(data => {
            return ({'topSongsData':topSongsData,'playlistData':data})
          })
      })
      //end of visualTrackData
    }


    renderChart = () => {
      this.visualTrackData()
      .then((dataPassed) => {
        var playlistData = JSON.parse(JSON.stringify(dataPassed.playlistData))
        var topSongsData = dataPassed.topSongsData[0]

        var datasets = []
        var labelData = []
        //modeling data for Top 30 songs
        if(topSongsData !== null || topSongsData !== undefined){
          var temp = []
          for (var item in topSongsData){
            labelData = labelData.concat(item)
            temp = temp.concat(topSongsData[item])
          }
          datasets = datasets.concat({
            label: 'Top 30 songs analysis',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data : temp.slice(0,7)
          })
        }

        // modeling data for Playlists
        playlistData.forEach((item) => {
          if(item.trackData !==null || item.trackData !== undefined){
            temp = []
            for (var i in item.trackData){
              temp = temp.concat(item.trackData[i])
            }
            var backgroundColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            var borderColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
            datasets = datasets.concat({
              label: item.name,
              backgroundColor: backgroundColor,
              borderColor:borderColor,
              pointBackgroundColor:borderColor,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor:'#fff',
              pointHoverBorderColor: borderColor,
              data : temp.slice(0,7)
            })
          }
        })

        // console.log(datasets)
        const data = {
          labels : labelData.slice(0,7),
          datasets : datasets
        }
        return data
      })
      .then(data => {
        this.setState(() => ({
          ...this.state,
          chartData:data
        }))
      })

      
    }

    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    checkPropIsNull = () => {
      if(this.props.userObject.display_name.length > 0){
        return (
          <div>
            <UserTemplate>
              {this.props.userObject.images.length>0 ? (
                <Img src={this.props.userObject.images[0].url} alt='avatar'/>
              ) : (
                <NoUserTemplate />
              )}
            </UserTemplate>
            <UserName href={this.props.userObject.external_urls.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer"> 
                  <Name>{this.props.userObject.display_name}</Name>
            </UserName>
            
            <Stats>
              <Stat>
                <Number>{this.props.userObject.followers}</Number>
                <NumberLabel>Followers</NumberLabel>
              </Stat>
            </Stats>
            
            <MinorWrapper>
              <Heading>
                <h3>Top Listened Artists </h3>
                <div>
                {this.props.userObject.topArtists? (
                  <ul>
                    {this.props.userObject.topArtists.items.slice(0,10).map((artist,i) => (
                      <Artist key={i} >
                        <ArtistArtwork >
                        {artist.images.length &&(
                          <Img src={artist.images[2].url} alt='Artist' />
                        )}
                        </ArtistArtwork>
                        <ArtistName>
                          <a href={artist.external_urls.spotify}><span>{artist.name}</span></a>
                        </ArtistName>
                      </Artist>
                    ))}
                  </ul>
                ) : (<div></div>)}
              </div>
              </Heading>
              <div style={{'margin':'10px'}}></div>
              <Heading style>
                <h3>Top Music Genre</h3>
                <div>
                {this.props.userObject.recommendedGenre? (
                  <ul>
                    {this.props.userObject.recommendedGenre.slice(0,10).map((item,i) => (
                      <Artist key={i}>
                      <ArtistName >
                        <span>{item}</span>
                      </ArtistName>
                      </Artist>
                    ))}
                  </ul>
                ) : (<div></div>)}
              </div>
              </Heading>
            
              
            </MinorWrapper>
            <div>
              <ChartTitle> Audio Analysis of Tracks and Playlists </ChartTitle>
              <Radar data={this.state.chartData} options={{legend:{fontsize:20}}} />
            </div>
            <Button onClick={this.handleCloseModal}>Close</Button>
          </div>
        )
      }
      else{
        return(
          <div>
            <Button onClick={this.handleCloseModal}>Close</Button>
          </div>
        )
      }
    }

    render () {
      return (
        <Wrapper>
          <Button onClick={this.handleOpenModal}>View Your Stats! </Button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Modal"
          >
            <this.checkPropIsNull />
          </ReactModal>
        </Wrapper>
      );
    }
  }



export default UserModal;


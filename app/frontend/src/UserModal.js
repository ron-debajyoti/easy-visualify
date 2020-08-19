import React,{Component} from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Cookies from 'js-cookie'
import * as util from './utils/Utility'
import {Radar} from 'react-chartjs-2'

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
        )
      ).then(data => data.slice(0,1))

      //end of visualTrackData
    }


    renderChart = () => {
      this.visualTrackData()
      .then((dataPassed) => {
        var renderData = []
        var labelData = []
        if(dataPassed[0] !== null || dataPassed[0] !== undefined){
          for (var item in dataPassed[0]){
            labelData = labelData.concat(item)
            renderData = renderData.concat(dataPassed[0][item])
          }
          // console.log(labelData)
          // console.log(renderData)
          const data = {
            labels : labelData.slice(0,7),
            datasets : [{
              label: 'Top 30 songs analysis',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data : renderData.slice(0,7)
            }]
          }
          return data
        }
        else{
          console.log(dataPassed[0])
          console.log('broken')
          return null
        }
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
            <Radar data={this.state.chartData} options={{legend:{fontsize:20}}} />
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


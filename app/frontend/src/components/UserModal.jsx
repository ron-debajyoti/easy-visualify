import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';

import * as util from '../utils/Utility';
import RadarChart from './RadarChart';
import '../css/Modal.css';
import Loading from '../images/loading3.gif';

const Button = styled.button`
  font-size: 1em;
  margin: 0.5em;
  padding: 0.5em 1em;
  border: 2px solid black;
  border-radius: 3px;
  float: right;
  bottom: 0;
`;

const Wrapper = styled.div`
  background-color: transparent;
  display: inline-block;
`;

const Space = styled.div`
  margin: 10px;
`;

const IsDataWrapper = styled.div`
  text-align: -moz-center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 20px;
`;

const NoUserTemplate = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: 20px;
`;

const UserImage = styled.img`
  height: 150px;
  width: 125px;
  border-radius: 50%;
`;

const UserName = styled.a`
  margin: 20px;
  color: white;
  display: inline-flex;
  text-align: center;

  &:hover &:visited &:active &:focus {
    color: white;
  }
`;

const Name = styled.h1`
  font-size: 1.5em;
  font-weight: 50;
  margin: 25px 10px;
`;

const Number = styled.div`
  color: white;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  margin: 15px 0px 0px;
`;

const NumberLabel = styled.div`
  color: white;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 15px 5px 5px;
`;

const Stat = styled.div`
  text-align: center;
  display: inline-block;
  margin: 20px;
`;

const Artist = styled.li`
  display: -webkit-box;
  align-items: center;
  margin: 15px 10px;
  &: hover;
`;
const ArtistArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  margin: 5px;
  img {
    width: 30px;
    height: 30px;
    margin: 10px;
    border-radius: 100%;
  }
`;

const SongArtwork = styled.div`
  display: inline-block;
  margin: 5px;
  img {
    width: 60px;
    height: 60px;
    margin: 5px;
  }
`;

const ArtistName = styled.div`
  flex-grow: 1;
  margin: 5px;
  a {
    color: white;
    text-decoration: none;
  }
  span {
    font-size: medium;
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      color: white;
      border-bottom: 1px solid black;
    }
  }
`;

const SongName = styled.div`
  flex-grow: 1;
  margin: 5px;
  a {
    color: white;
    text-decoration: none;
  }
  span {
    font-size: small;
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      color: white;
      border-bottom: 1px solid black;
    }+-+
  }
`;

const Heading = styled.div`
  display: inline-block;
  justify-content: space-between;
  margin: 20px;
`;

const HeadHeader = styled.h3`
  display: inline-block;
  color: white;
  margin: 10px;
`;

const MinorWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 15px;
  overflow: auto;
`;

const user = {
  display_name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  images: PropTypes.any,
  external_urls: PropTypes.string,
  product: PropTypes.any,
  topTracks: PropTypes.array.isRequired,
  topArtists: PropTypes.array.isRequired,
  recommendedGenre: PropTypes.array.isRequired,
  userPlaylists: PropTypes.array.isRequired,
};

const propTypes = {
  userObject: PropTypes.instanceOf(user).isRequired,
};

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      chartData: null,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.visualTrackData = this.visualTrackData.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.renderChart();
    ReactModal.setAppElement('body');
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  // function visualTrackData
  visualTrackData = async () => {
    const accessToken = Cookies.get('access_token');
    const datatype = {
      danceability: 0,
      energy: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
      tempo: 0,
    };
    const template = {
      name: null,
      description: null,
      owner: null,
      tracks: [],
      trackAnalysis: null,
      count: 0,
    };

    const { userObject } = this.props;
    return Promise.all(
      userObject.topTracks
        .map((track) =>
          util.fetchAudioFeatures(accessToken, track.id).then((response) => {
            Object.keys(response).forEach((key) => {
              datatype[key] += response[key] / 30;
            });
            return datatype;
          })
        )
        .concat(
          userObject.userPlaylists.map((playlist) => {
            const offset = 0;
            const playlistTemp = JSON.parse(JSON.stringify(template));
            playlistTemp.name = playlist.name;
            playlistTemp.description = playlist.description;
            playlistTemp.owner = playlist.owner.display_name;

            let offsetPassedAgain;
            const checker = async (token, playlistPassed, offsetPassed) => {
              if (offsetPassed < playlistPassed.tracks.total) {
                return util
                  .fetchTracksfromPlaylists(token, playlistPassed.href, offsetPassed)
                  .then((response) => {
                    playlistTemp.tracks = playlistTemp.tracks.concat(response.items);
                    // console.log(playlistTemp.tracks)
                    offsetPassedAgain = offsetPassed + 100;
                  })
                  .then(() => checker(token, playlistPassed, offsetPassedAgain));
              }
              return playlistTemp;
            };
            return checker(accessToken, playlist, offset).then(() => {
              playlistTemp.count = playlistTemp.tracks.length;
              // console.log(playlistTemp)
              return playlistTemp;
            });
          })
        )
    ).then((data) => {
      const topSongsData = data.slice(0, 1);
      const playlistData = data.slice(30, data.length);

      const pd = playlistData.map(async (playlist) => {
        if (playlist !== undefined && playlist !== null) {
          const datatype2 = {
            danceability: 0,
            energy: 0,
            speechiness: 0,
            acousticness: 0,
            instrumentalness: 0,
            liveness: 0,
            valence: 0,
            tempo: 0,
          };
          const template2 = {
            name: playlist.name,
            owner: playlist.owner,
            description: playlist.description,
            trackData: null,
          };
          // our batchsize = 100 tracks
          // our timeout = 1000ms
          const f = async (arrayTracks) =>
            util.fetchAudioFeaturesForMultipleTracks(accessToken, arrayTracks).then((response) =>
              response.audio_features.map((r) => {
                if (r !== undefined && r !== null) {
                  Object.keys(r).forEach((key) => {
                    datatype2[key] += r[key] / playlist.count;
                  });
                }
                return datatype2;
              })
            );

          // looping across the playlist.track in batches of 100 to avoid API rate limit exceeded error
          let i;
          const j = playlist.tracks.length;
          const chunk = 100;
          const promises = [];
          for (i = 0; i < j; i += chunk) {
            const block = playlist.tracks
              .slice(i, i + chunk)
              .map((t) => t.track.id)
              .join();
            promises.push(
              f(block).then((response) => {
                const [tempStore] = response.slice(0, 1);
                template2.trackData = JSON.parse(JSON.stringify(tempStore));
                return template2;
              })
            );
          }
          return Promise.all(promises);
        }
        return null;
      });

      return Promise.all(pd)
        .then((dataTrack) => dataTrack.filter((item) => item !== undefined))
        .then((dataTrack) => dataTrack.map((item) => item[0]))
        .then((dataTrack) => ({ topSongsData, playlistData: dataTrack }));
    });
    // end of visualTrackData
  };

  renderChart = () => {
    this.visualTrackData()
      .then((dataPassed) => {
        const playlistData = JSON.parse(JSON.stringify(dataPassed.playlistData));
        const topSongsData = dataPassed.topSongsData[0];

        let datasets = [];
        let labelData = [];
        // modeling data for Top 30 songs
        if (topSongsData !== null || topSongsData !== undefined) {
          let temp = [];

          Object.keys(topSongsData).forEach((key) => {
            labelData = labelData.concat(key);
            temp = temp.concat(topSongsData[key]);
          });

          datasets = datasets.concat({
            label: 'Top 30 songs analysis',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: temp.slice(0, 7),
          });
        }

        // modeling data for Playlists
        /* Creating two datasets , one with saved playlists and other with owner's playlist only
          is kinda better. Might take some extra time preprocessing it but rendering the chart is 
          going to be easy wrt to the toggle button.
        */

        playlistData.forEach((item) => {
          if (item.trackData !== null || item.trackData !== undefined) {
            let temp = [];
            Object.keys(item.trackData).forEach((e) => {
              temp = temp.concat(item.trackData[e]);
            });

            temp = temp.slice(0, 7);
            const backgroundColor = `#33${(0x1000000 + Math.random() * 0xffffff)
              .toString(16)
              .substr(1, 6)}`;
            const borderColor = `#33${(0x1000000 + Math.random() * 0xffffff)
              .toString(16)
              .substr(1, 6)}`;

            datasets = datasets.concat({
              owner: item.owner,
              label: item.name,
              backgroundColor,
              borderColor,
              fill: true,
              pointBackgroundColor: borderColor,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: borderColor,
              data: temp,
            });
          }
        });

        const data = {
          labels: labelData.slice(0, 7),
          datasets,
        };
        return data;
      })
      .then((data) => {
        this.setState({
          chartData: data,
        });
      });
  };

  checkPropIsNull = () => {
    const { userObject } = this.props;
    const { chartData } = this.state;

    if (userObject.display_name.length > 0) {
      return (
        <IsDataWrapper>
          <HeaderWrapper>
            <div style={{}}>
              {userObject.images.length > 0 ? (
                <UserImage src={userObject.images[0].url} alt="avatar" />
              ) : (
                <NoUserTemplate />
              )}
              <UserName
                href={userObject.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Name>{userObject.display_name}</Name>
              </UserName>

              <Stat>
                <Number>{userObject.followers}</Number>
                <NumberLabel>Followers</NumberLabel>
              </Stat>
            </div>
          </HeaderWrapper>
          <MinorWrapper>
            <Heading>
              <HeadHeader>Top Listened Artists </HeadHeader>
              <div>
                {userObject.topArtists ? (
                  <ul key={nanoid()} style={{ padding: '20px' }}>
                    {userObject.topArtists.items.slice(0, 10).map((artist) => (
                      <Artist key={nanoid()}>
                        <ArtistArtwork>
                          {artist.images.length && <img src={artist.images[1].url} alt="Artist" />}
                        </ArtistArtwork>
                        <ArtistName>
                          <a href={artist.external_urls.spotify}>
                            <span>{artist.name}</span>
                          </a>
                        </ArtistName>
                      </Artist>
                    ))}
                  </ul>
                ) : (
                  <div />
                )}
              </div>
            </Heading>
            <Space />
            <Heading style>
              <HeadHeader>Top Listened Songs</HeadHeader>
              <div>
                {userObject.topTracks ? (
                  <ul
                    key={nanoid()}
                    style={{ padding: '20px', display: 'table-row', textAlign: 'initial' }}
                  >
                    {userObject.topTracks.slice(0, 10).map((item) => (
                      <Artist key={nanoid()}>
                        <SongArtwork>
                          {item.album.images.length && (
                            <img src={item.album.images[0].url} alt="AlbumArt" />
                          )}
                        </SongArtwork>
                        <div>
                          <ArtistName>
                            <a href={item.external_urls.spotify}>
                              <span>{item.name}</span>
                            </a>
                          </ArtistName>
                          {item.artists.map((artist) => (
                            <SongName key={nanoid()}>
                              <a href={artist.external_urls.spotify}>
                                <span>{artist.name}</span>
                              </a>
                            </SongName>
                          ))}
                        </div>
                      </Artist>
                    ))}
                  </ul>
                ) : (
                  <div />
                )}
              </div>
            </Heading>
            <Space />
            <Heading style>
              <HeadHeader>Top Music Genre</HeadHeader>
              <div>
                {userObject.recommendedGenre ? (
                  <ul key={nanoid()} style={{ padding: '20px' }}>
                    {userObject.recommendedGenre.slice(0, 15).map((item) => (
                      <Artist key={nanoid()}>
                        <ArtistName>
                          <span style={{ color: 'white' }}>{item}</span>
                        </ArtistName>
                      </Artist>
                    ))}
                  </ul>
                ) : (
                  <div />
                )}
              </div>
            </Heading>
          </MinorWrapper>
          {chartData ? (
            <RadarChart chartData={chartData} username={userObject.display_name} />
          ) : (
            <div>
              <HeadHeader>Audio Data is still loading....</HeadHeader>
              <img src={Loading} alt='loading..' />
            </div>
          )}
          <Button onClick={this.handleCloseModal}>Close</Button>
        </IsDataWrapper>
      );
    }

    return (
      <div>
        <Button onClick={this.handleCloseModal}>Close</Button>
      </div>
    );
  };

  render() {
    const { showModal } = this.state;
    const { userObject } = this.props;
    return (
      <Wrapper>
        <Button onClick={this.handleOpenModal}>{userObject.display_name}&apos;s Stats! </Button>
        <ReactModal isOpen={showModal} contentLabel="Modal" className="Popup">
          <this.checkPropIsNull />
        </ReactModal>
      </Wrapper>
    );
  }
}

UserModal.propTypes = propTypes;

export default UserModal;

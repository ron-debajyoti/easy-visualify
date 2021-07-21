import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';

import * as util from '../utils/Utility';
import RadarChart from './RadarChart';
import '../css/Modal.css';
import Loading from '../images/loading3.gif';

const Button = styled.button`
  ${media.lessThan('medium')`
    font-size: medium;
    margin: 0.5vh;
    padding: 1vh;
  `}

  ${media.greaterThan('medium')`
    font-size: 1em;
    margin: 0.5em;
    padding: 0.5em 1em;
  `}

  border: 2px solid black;
  border-radius: 3px;
  float: right;
  bottom: 0;
`;

const FormInput = styled.input``;

const FormLabel = styled.label`
  ${media.lessThan('medium')`
  font-size: small;
  `}

  ${media.greaterThan('medium')`
  font-size: medium;
  `}
  color: white;
`;

const UnorderedList = styled.ul`
  ${media.lessThan('medium')`
    margin: 0px 2px;
    padding: 0px 5px;
  `}

  ${media.greaterThan('medium')`
  padding: 20px;
  `}
`;

const Heading = styled.div`
  ${media.lessThan('medium')`
    margin: 10px;
  `}

  ${media.greaterThan('medium')`
    margin: 20px;
  `}

  display: inline-block;
  justify-content: space-between;
  margin: 20px;
`;

const HeaderHeading = styled.h2`
  ${media.lessThan('medium')`
    font-size: medium;
  `}

  ${media.greaterThan('medium')`
    font-size: xx-large;
  `}
  color: white;
  margin: 10px;
`;

const TimeSelectorHeading = styled.h3`
  ${media.lessThan('medium')`
  font-size: small;
  `}

  ${media.greaterThan('medium')`
  font-size: medium;
  `}
  color: white;
`;

const HeadHeader = styled.h3`
  ${media.lessThan('medium')`
    font-size: large;
    margin: 5px;
  `}

  ${media.greaterThan('medium')`
    font-size: x-large;
    margin: 10px;
  `}

  display: inline-block;
  color: white;
  margin: 10px;
`;

/* styled wrappers  */
const UserWrapper = styled.div`
  display: flex;
  margin: 10px 10px 10px auto;
`;

const Wrapper = styled.div`
  background-color: transparent;
  display: inline-block;
  margin: 10px;
`;

const Space = styled.div`
  margin: 10px;
`;

const IsDataWrapper = styled.div`
  text-align: -moz-center;
`;

const ListWrapper = styled.div`
  text-align: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 20px;
`;

const MinorWrapper = styled.section`
  ${media.lessThan('medium')`
    display: inline;
  `}

  ${media.greaterThan('medium')`
    display: flex;
  `}
  justify-content: center;
  align-items: flex-start;
  margin-top: 15px;
  overflow: auto;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px;
`;

/* styled user template */

const NoUserTemplate = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: 20px;
`;

const LoadingGif = styled.img`
  object-fit: cover;
`;

const UserImage = styled.img`
  ${media.lessThan('medium')`
    height: 60px;
    width: 50px;
  `}

  ${media.greaterThan('medium')`
    height: 150px;
    width: 125px;
  `}

  border-radius: 50%;
`;

const UserName = styled.a`
  margin: 5px;
  color: white;
  display: initial;
  text-align: center;

  &:hover &:visited &:active &:focus {
    color: white;
  }
`;

const Name = styled.h1`
  ${media.lessThan('medium')`
    font-size: medium;
    font-weight: 25;
    margin: 1px;
  `}

  ${media.greaterThan('medium')`
    font-size: 1.5em;
    font-weight: 50;
    margin: 25px 10px;
  `}
`;

const Number = styled.div`
  color: white;
  font-weight: 500;
  font-size: small;
  letter-spacing: 1px;
  margin: 5px 0px 0px;
`;

const NumberLabel = styled.div`
  ${media.lessThan('medium')`
    margin: 2px 2px 2px;
  `}

  ${media.greaterThan('medium')`
    margin: 5px 5px 5px;
  `}

  color: white;
  font-size: small;
  text-transform: uppercase;
  letter-spacing: 1px;

  margin: 5px 5px 5px;
`;

const Stat = styled.div`
  ${media.lessThan('medium')`
    margin: 5px;
  `}

  ${media.greaterThan('medium')`
    margin: 10px
  `}
  text-align: center;
  display: inline-block;
`;

/* styled artist and song entries */

const Artist = styled.li`
  ${media.lessThan('medium')`
    margin: 5px 3px;
    display: inline flow-root;
  `}

  ${media.greaterThan('medium')`
    margin: 15px 10px;
    display: -webkit-box;
  `}
  align-items: center;
  &: hover;
`;
const ArtistArtwork = styled.div`
  ${media.lessThan('medium')`
    width: 15px;
    margin: 3px;
    img {
      width: 25px;
      height: 25px;
      margin: 5px;
      border-radius: 100%;
    }
  `}

  ${media.greaterThan('medium')`
    width: 30px;
    margin: 5px;
    img {
      width: 35px;
      height: 35px;
      margin: 10px;
      border-radius: 100%;
    }
  `}

  display: inline-block;
  position: relative;
`;

const SongArtwork = styled.div`
  ${media.lessThan('medium')`
  margin: 3px;
  img {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  `}

  ${media.greaterThan('medium')`
  margin: 5px;
  img {
    width: 60px;
    height: 60px;
    margin: 5px;
  }
  `}

  display: inline-block;
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

const user = {
  display_name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  images: PropTypes.array,
  external_urls: PropTypes.object,
  product: PropTypes.string,
  topTracksRecent: PropTypes.array.isRequired,
  topTracksMedium: PropTypes.array.isRequired,
  topTracksLong: PropTypes.array.isRequired,
  topArtistsRecent: PropTypes.object.isRequired,
  topArtistsMedium: PropTypes.object.isRequired,
  topArtistsLong: PropTypes.object.isRequired,
  recommendedGenre: PropTypes.array.isRequired,
  userPlaylists: PropTypes.array.isRequired,
};

const propTypes = {
  userObject: PropTypes.shape(user).isRequired,
};

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      chartData: null,
      timeType: 'long', // recent | medium | long
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRecentClick = this.handleRecentClick.bind(this);
    this.handleMediumClick = this.handleMediumClick.bind(this);
    this.handleLongClick = this.handleLongClick.bind(this);
    this.visualTrackData = this.visualTrackData.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.renderChart();
    ReactModal.setAppElement('body');
  }

  handleRecentClick() {
    this.setState({ timeType: 'recent' });
  }

  handleMediumClick() {
    this.setState({ timeType: 'medium' });
  }

  handleLongClick() {
    this.setState({ timeType: 'long' });
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
      userObject.topTracksLong
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
    const { chartData, timeType } = this.state;

    let topArtists = userObject.topArtistsLong;
    let topTracks = userObject.topTracksLong;

    if (timeType === 'recent') {
      topArtists = userObject.topArtistsRecent;
      topTracks = userObject.topTracksRecent;
    } else if (timeType === 'medium') {
      topArtists = userObject.topArtistsMedium;
      topTracks = userObject.topTracksMedium;
    }

    if (userObject.display_name.length > 0) {
      return (
        <IsDataWrapper>
          <HeaderWrapper className="main-wrapper">
            <HeaderHeading className="main-heading"> Statistics </HeaderHeading>
            <UserWrapper className="user-details-wrapper">
              {userObject.images.length > 0 ? (
                <UserImage src={userObject.images[0].url} alt="avatar" />
              ) : (
                <NoUserTemplate />
              )}
              <div style={{ display: 'inline-grid' }}>
                <UserName
                  href={userObject.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Name className="username">{userObject.display_name}</Name>
                </UserName>

                <Stat className="user-statistics">
                  <Number>{userObject.followers}</Number>
                  <NumberLabel>Followers</NumberLabel>
                </Stat>
              </div>
            </UserWrapper>
          </HeaderWrapper>
          <ToggleButtonWrapper className="toggle-button-wrapper">
            <TimeSelectorHeading> Select time : </TimeSelectorHeading>
            <form className="time-selector">
              <FormInput
                type="radio"
                id="switch_recent"
                name="switchToggle"
                value="recent"
                onChange={this.handleRecentClick}
                checked={timeType === 'recent'}
              />
              <FormLabel htmlFor="switch_recent"> Recently Played </FormLabel>
              <FormInput
                type="radio"
                id="switch_medium"
                name="switchToggle"
                value="medium"
                onChange={this.handleMediumClick}
                checked={timeType === 'medium'}
              />
              <FormLabel htmlFor="switch_medium"> Yearly </FormLabel>
              <FormInput
                type="radio"
                id="switch_long"
                name="switchToggle"
                value="long"
                onChange={this.handleLongClick}
                checked={timeType === 'long'}
              />
              <FormLabel htmlFor="switch_long"> All Time </FormLabel>
            </form>
          </ToggleButtonWrapper>
          <MinorWrapper className="spotify-data-wrapper">
            <Heading className="div-section-artists">
              <HeadHeader className="header-artists">Top Listened Artists </HeadHeader>
              <div>
                {topArtists ? (
                  <UnorderedList className="list-artists" key={nanoid()}>
                    {topArtists.items.slice(0, 10).map((artist) => (
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
                  </UnorderedList>
                ) : (
                  <div />
                )}
              </div>
            </Heading>
            <Space />
            <Heading className="div-section-tracks">
              <HeadHeader className="header-tracks">Top Listened Tracks</HeadHeader>
              <ListWrapper>
                {topTracks ? (
                  <UnorderedList className="list-tracks" key={nanoid()}>
                    {topTracks.slice(0, 10).map((item) => (
                      <Artist key={nanoid()}>
                        <SongArtwork>
                          {item.album.images.length && (
                            <img src={item.album.images[0].url} alt="AlbumArt" />
                          )}
                        </SongArtwork>
                        <div style={{ textAlign: 'start' }}>
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
                  </UnorderedList>
                ) : (
                  <div />
                )}
              </ListWrapper>
            </Heading>
            <Space />
            <Heading className="div-section-genre">
              <HeadHeader classNmae="header-genre">Top Music Genre</HeadHeader>
              <div>
                {userObject.recommendedGenre ? (
                  <UnorderedList className="list-genres" key={nanoid()}>
                    {userObject.recommendedGenre.slice(0, 15).map((item) => (
                      <Artist key={nanoid()}>
                        <ArtistName>
                          <span style={{ color: 'white' }}>{item}</span>
                        </ArtistName>
                      </Artist>
                    ))}
                  </UnorderedList>
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
              <LoadingGif src={Loading} alt="loading.." />
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
        {/* {console.log(userObject)} */}
        <Button className="modal-enter" onClick={this.handleOpenModal}>
          {userObject.display_name}&apos;s Stats!{' '}
        </Button>
        <ReactModal isOpen={showModal} contentLabel="Modal" className="Popup">
          <this.checkPropIsNull />
        </ReactModal>
      </Wrapper>
    );
  }
}

UserModal.propTypes = propTypes;

export default UserModal;

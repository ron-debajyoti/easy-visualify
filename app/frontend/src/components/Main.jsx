import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';
import media from 'styled-media-query';
import Cookies from 'js-cookie';
import App from './App';
import UserModal from './UserModal';
import SongRenderer from './SongRenderer';
import * as util from '../utils/Utility';
import authGif from '../images/auth.gif';

const _ = require('lodash');

const Button = styled.button`
  background: palevioletred;
  color: white;
  ${media.lessThan('medium')`
    font-size: 0.75h;
    margin: 2vh;
    padding: 0.5vh 1vh;
  `}
  ${media.greaterThan('medium')`
    font-size: 0.75em;
    margin: 1em;
    padding: 0.5em 1em;
  `}
  border: 2px solid black;
  border-radius: 3px;
`;

const TriggerButton = styled(Button)`
  float: right;
`;

const ButtonWrapper = styled.div`
  ${media.lessThan('medium')`
    display: inline-flex;
  `}
  ${media.greaterThan('medium')`
    display: inline-grid;
  `}
`;

const Wrapper = styled.main``;

const Section1 = styled.div`
  ${media.lessThan('medium')`
    width: 100%;
    height: 100%;
  `}

  ${media.greaterThan('medium')`
    width: 70%;
    height: 100%;
  `}
  float: left;
`;

const Section2 = styled.div`
  ${media.lessThan('medium')`
    width: 100%;
    height: 100%;
  `}

  ${media.greaterThan('medium')`
    display: inline-grid;
    height: 100%;
    width: 30%;
  `}
`;

const MainTitle = styled.h2`
  ${media.lessThan('medium')`
    font-size: large;
  `}

  color: white;
  text-align: start;
  background: black;
`;

const WrongPage = styled.div`
  color: white;
  font-size: 1.5em;
  text-align: center;
`;

const Wrap = styled.div`
  text-align: center;
`;

const Gif = styled.img`
  max-width: 100%;
  margin: 10px;
  object-fit: contain'
`;

const Main = () => {
  /* setting various hooks here  */
  const [content, setContent] = useState([]);
  const [country, setCountry] = useState('None');
  const [contentType, setContentType] = useState('top');
  const [user, setUser] = useState({
    user: {
      display_name: null,
      country: null,
      followers: null,
      images: null,
      external_urls: null,
      product: null,
      topTracksRecent: null,
      topTracksMedium: null,
      topTracksLong: null,
      topArtistsRecent: null,
      topArtistsMedium: null,
      topArtistsLong: null,
      recommendedGenre: null,
      userPlaylists: null,
    },
  });
  const [allUpdated, setAllUpdated] = useState(false);

  const updateGenre = async (data) => {
    let genre = [];
    data.topArtistsLong.items.slice(0, 15).map((artist) => {
      const temp = artist.genres;
      genre = genre.concat(temp);
      genre = _.uniq(genre);
      return true;
    });
    return genre;
  };

  useEffect(() => {
    // let accessToken = queryString.parse(window.location.search)['?access_token']
    // console.log(queryString.parse(window.location.search))
    // console.log(accessToken)
    const accessToken = Cookies.get('access_token');
    let userData = {
      display_name: null,
      country: null,
      followers: null,
      images: null,
      external_urls: null,
      product: null,
      topTracksRecent: null,
      topTracksMedium: null,
      topTracksLong: null,
      topArtistsRecent: null,
      topArtistsMedium: null,
      topArtistsLong: null,
      recommendedGenre: null,
      userPlaylists: null,
    };
    Promise.all([
      util.fetchUserData(accessToken).then((data) => {
        userData = {
          ...userData,
          display_name: data.display_name,
          country: data.country,
          followers: data.followers.total,
          external_urls: data.external_urls,
          images: data.images,
          product: data.product,
        };
      }),
      util.fetchTopTracks(accessToken, 'short_term').then((data) => {
        userData = {
          ...userData,
          topTracksRecent: data.items,
        };
      }),
      util.fetchTopTracks(accessToken, 'medium_term').then((data) => {
        userData = {
          ...userData,
          topTracksMedium: data.items,
        };
      }),
      util.fetchTopTracks(accessToken, 'long_term').then((data) => {
        userData = {
          ...userData,
          topTracksLong: data.items,
        };
      }),
      util.fetchUserPlaylists(accessToken).then((data) => {
        userData = {
          ...userData,
          userPlaylists: data.items,
        };
      }),
      util.fetchTopArtists(accessToken, 'short_term').then((data) => {
        userData = {
          ...userData,
          topArtistsRecent: data,
        };
      }),
      util.fetchTopArtists(accessToken, 'medium_term').then((data) => {
        userData = {
          ...userData,
          topArtistsMedium: data,
        };
      }),
      util
        .fetchTopArtists(accessToken, 'long_term')
        .then((data) => {
          userData = {
            ...userData,
            topArtistsLong: data,
          };
        })
        .then(() => updateGenre(userData))
        .then((genre) => {
          userData = {
            ...userData,
            recommendedGenre: genre,
          };
        }),
    ]).then(() => {
      console.log('!!!!!!!!!!11');
      setUser(userData);
      setAllUpdated(true);
    });
  }, []);

  const onUpdate = (receivedContent) => {
    setContent(receivedContent);
    console.log('updated state !');
  };

  const onButtonClick = (type) => {
    setContentType(type);
  };

  const tooltipRender = (receivedcountry) => {
    setCountry(receivedcountry);
    ReactTooltip.rebuild();
  };

  // useEffect(() => {

  // }, [contentType])

  return (
    <div>
      {allUpdated ? (
        <Wrapper>
          <MainTitle> Main Page </MainTitle>
          <Section1>
            <UserModal userObject={user} />
            <App setTooltipContent={(e) => onUpdate(e)} setTooltip={tooltipRender} />
          </Section1>
          <Section2>
            <ButtonWrapper>
              <TriggerButton className="Daily Top 10" onClick={() => onButtonClick('top')}>
                {' '}
                Daily Top 10 Tracks
              </TriggerButton>
              <TriggerButton className="Daily Viral 10" onClick={() => onButtonClick('viral')}>
                {' '}
                Daily Viral 10 Tracks{' '}
              </TriggerButton>
              <TriggerButton className="Radar" onClick={() => onButtonClick('radar')}>
                {' '}
                Radar Tracks{' '}
              </TriggerButton>
              <TriggerButton className="Weekly Top" onClick={() => onButtonClick('weekly')}>
                {' '}
                Weekly Top 10 Tracks
              </TriggerButton>
            </ButtonWrapper>
            <SongRenderer content={content} contentType={contentType} />
          </Section2>
          <ReactTooltip>{country}</ReactTooltip>
        </Wrapper>
      ) : (
        <Wrap>
          <WrongPage> Authenticating </WrongPage>
          <Gif src={authGif} alt="loading..." />
        </Wrap>
      )}
    </div>
  );
};

export default Main;

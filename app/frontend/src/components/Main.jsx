import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';
// import media from 'styled-media-query';
import Cookies from 'js-cookie';
import App from './App';
import UserModal from './UserModal';
import SongRenderer from './SongRenderer';
import * as util from '../utils/Utility';
import { Button, Div } from './Reusables';

import authGif from '../images/auth.gif';

// setting styled macros
const Header = Div;

const _ = require('lodash');

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
  object-fit: contain;
`;

const SESSION_IDENTIFIER = 'user_data';

const getSessionStorage = () => JSON.parse(sessionStorage.getItem(SESSION_IDENTIFIER));

const setSessionStorage = (data) =>
  sessionStorage.setItem(SESSION_IDENTIFIER, JSON.stringify(data));

const Main = () => {
  /* setting various hooks here  */
  const [content, setContent] = useState([[]]);
  const [country, setCountry] = useState('None');
  const [contentType, setContentType] = useState('top');
  const [user, setUser] = useState({
    user: {
      display_name: null,
      country: null,
      followers: null,
      images: null,
      external_urls: '',
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
  const [updatefromApp, SetUpdateFromApp] = useState(false);

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

  const fetchAll = async () => {
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
    await Promise.all([
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
    ]);
    return userData;
  };

  useEffect(() => {
    const oldUserData = getSessionStorage();
    if (oldUserData === undefined || oldUserData === null) {
      fetchAll().then((userData) => {
        setUser(userData);
        setSessionStorage(userData);
        setAllUpdated(true);
      });
    } else {
      console.log('got from session cache');
      console.log(oldUserData);
      setUser(oldUserData);
      setAllUpdated(true);
    }
  }, []);

  const onUpdate = (receivedContent) => {
    setContent(receivedContent);
  };

  const onButtonClick = (type) => {
    setContentType(type);
  };

  const tooltipRender = (receivedcountry) => {
    setCountry(receivedcountry);
    ReactTooltip.rebuild();
  };

  return (
    <Div className="div-main-section">
      {allUpdated ? (
        <Div className="main-page" justifyContent="center" alignItems="stretch">
          <Div className="div-section-1" flexDirection="column" justifyContent="center">
            {updatefromApp ? (
              <Div className="div-wrapper-button">
                <UserModal userObject={user} />
                <Button className="daily-top" onClick={() => onButtonClick('top')}>
                  {' '}
                  Daily Top Tracks
                </Button>
                <Button className="daily-viral" onClick={() => onButtonClick('viral')}>
                  {' '}
                  Daily Viral Tracks{' '}
                </Button>
                <Button className="radar" onClick={() => onButtonClick('radar')}>
                  {' '}
                  Radar Tracks{' '}
                </Button>
                <Button className="weekly-top" onClick={() => onButtonClick('weekly')}>
                  {' '}
                  Weekly Top Tracks
                </Button>
              </Div>
            ) : (
              <Header color="white" fontSize="large" padding="0.7em">
                Map data is loading and rendering...
              </Header>
            )}
            <App
              setTooltipContent={(e) => onUpdate(e)}
              setTooltip={tooltipRender}
              setDatafetch={SetUpdateFromApp}
            />
            <ReactTooltip>{country}</ReactTooltip>
          </Div>
          <SongRenderer content={content} contentType={contentType} isUpdated={updatefromApp} />
        </Div>
      ) : (
        <Wrap>
          <WrongPage> Authenticating </WrongPage>
          <Gif src={authGif} alt="loading..." />
        </Wrap>
      )}
    </Div>
  );
};

export default Main;

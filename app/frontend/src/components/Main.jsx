import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';
import Cookies from 'js-cookie';
import App from './App';
import PlayWidget from './Widget';
import UserModal from './UserModal';
import * as util from '../utils/Utility';

const _ = require('lodash');

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
`;

const ButtonWrapper = styled.div`
  display: inline-grid;
`;

const Wrapper = styled.main``;

const Section1 = styled.div`
  width: 75%;
  height: 100%;
  float: left;
`;

const Section2 = styled.div`
  display: inline-grid;
  height: 100%;
  width: 25%;
`;

const MainTitle = styled.h2`
  color: white;
  text-align: start;
  background: black;
`;

const WidgetTitle = styled.div`
  font-size: 1em;
  margin: 30px 10px
  text-align: left;
  color: white;
`;

const WidgetWrapper = styled.div`
  display: inline;
  padding: 0.7em;
`;

const Main = () => {
  /* setting various hooks here  */
  const [content, setContent] = useState('s');
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
      topTracks: null,
      topArtists: null,
      recommendedGenre: null,
      userPlaylists: null,
    },
  });
  const [allUpdated, setAllUpdated] = useState(false);

  const updateGenre = async (data) => {
    let genre = [];
    data.topArtists.items.slice(0, 15).map((artist) => {
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
    // const { user, allUpdated } = this.state;
    let userData = {
      display_name: null,
      country: null,
      followers: null,
      images: null,
      external_urls: null,
      product: null,
      topTracks: null,
      topArtists: null,
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
      util.fetchTopTracks(accessToken).then((data) => {
        userData = {
          ...userData,
          topTracks: data.items,
        };
      }),
      util.fetchUserPlaylists(accessToken).then((data) => {
        userData = {
          ...userData,
          userPlaylists: data.items,
        };
      }),
      util
        .fetchTopArtists(accessToken)
        .then((data) => {
          userData = {
            ...userData,
            topArtists: data,
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
  });

  const onUpdate = (receivedContent) => {
    setContent(receivedContent);
    console.log('updated state !');
    // console.log(this.state.contentType)
    // console.log(this.state.content)
  };

  const onButtonClick = (type) => {
    setContentType(type);
  };

  const tooltipRender = (receivedcountry) => {
    // console.log(content)
    setCountry(receivedcountry);
    ReactTooltip.rebuild();
  };

  const IsValidData = () => {
    if (content.length >= 2) {
      const populateCards1 = content[0].map((element) => (
        <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />
      ));
      const populateCards2 = content[1].map((element) => (
        <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />
      ));
      const populateCards3 = content[2].map((element) => (
        <PlayWidget key={element.uri} width={300} height={100} uri={element.uri} />
      ));

      if (contentType === 'top') {
        if (content[0].length > 0) {
          return (
            <WidgetWrapper>
              <WidgetTitle> Top 10 Tracks of {content[3]} </WidgetTitle>

              <ol style={{ display: 'inline list-item' }}>{populateCards1}</ol>
            </WidgetWrapper>
          );
        }
        return (
          <WidgetTitle>
            <WidgetTitle style={{ fontSize: '1em' }}>
              Spotify doesn&apos;t have the data yet. Try Radar Tracks
            </WidgetTitle>
          </WidgetTitle>
        );
      }
      if (contentType === 'viral') {
        if (content[1].length > 0) {
          return (
            <WidgetWrapper>
              <WidgetTitle> Viral 10 Tracks of {content[3]} </WidgetTitle>
              <ol style={{ display: 'inline list-item' }}>{populateCards2}</ol>
            </WidgetWrapper>
          );
        }
        return (
          <WidgetTitle>
            <WidgetTitle style={{ fontSize: '1em' }}>
              {' '}
              Spotify doesn&apos;t have the data yet. Try Radar Tracks{' '}
            </WidgetTitle>
          </WidgetTitle>
        );
      }
      if (content[2].length > 0) {
        return (
          <WidgetWrapper>
            <WidgetTitle> Radar Tracks of {content[3]} </WidgetTitle>
            <ol style={{ display: 'inline list-item' }}>{populateCards3}</ol>
          </WidgetWrapper>
        );
      }
      return (
        <WidgetTitle>
          <WidgetTitle style={{ fontSize: '1em' }}>
            {' '}
            Spotify doesn&apos;t have the data yet. Try other Tracks{' '}
          </WidgetTitle>
        </WidgetTitle>
      );
    }

    if (content[0] === 's') {
      return <WidgetTitle> Click on a country to begin! </WidgetTitle>;
    }
    return <WidgetTitle> Spotify is not supported in {content[0]} !</WidgetTitle>;
  };

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
              <TriggerButton className="Top10" onClick={() => onButtonClick('top')}>
                {' '}
                View Top 10 Tracks
              </TriggerButton>
              <TriggerButton className="Viral10" onClick={() => onButtonClick('viral')}>
                {' '}
                View Viral 10 Tracks{' '}
              </TriggerButton>
              <TriggerButton className="Radar" onClick={() => onButtonClick('radar')}>
                {' '}
                View Radar Tracks{' '}
              </TriggerButton>
            </ButtonWrapper>
            <IsValidData />
          </Section2>
          <ReactTooltip>{country}</ReactTooltip>
        </Wrapper>
      ) : (
        <h3 style={{ textAlign: 'center', color: 'white' }}>Loading ... </h3>
      )}
    </div>
  );
};

export default Main;

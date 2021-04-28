import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  display: inline-block;
  background: white;
`;

const Wrapper = styled.div`
  background-color: white;
`;

const WidgetTitle = styled.div`
  font-size: 1.5em;
  float: center;
  margin: 50px 10px
  text-align: left;
  color: palevioletred;
  background-color: white;
`;

const WidgetWrapper = styled.div`
  padding: 1em;
  background : aquamarine
  float: right;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 's',
      country: 'None',
      contentType: 'top',
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
      allUpdated: false,
    };
  }

  componentDidMount() {
    // let accessToken = queryString.parse(window.location.search)['?access_token']
    // console.log(queryString.parse(window.location.search))
    // console.log(accessToken)
    const accessToken = Cookies.get('access_token');
    Promise.all([
      util.fetchUserData(accessToken).then((data) => {
        this.setState(() => ({
          ...this.state,
          user: {
            ...this.state.user,
            display_name: data.display_name,
            country: data.country,
            followers: data.followers.total,
            external_urls: data.external_urls,
            images: data.images,
            product: data.product,
          },
        }));
      }),
      util.fetchTopTracks(accessToken).then((data) => {
        this.setState(() => ({
          ...this.state,
          user: {
            ...this.state.user,
            topTracks: data.items,
          },
        }));
      }),
      util.fetchUserPlaylists(accessToken).then((data) => {
        this.setState(() => ({
          ...this.state,
          user: {
            ...this.state.user,
            userPlaylists: data.items,
          },
        }));
      }),
      util
        .fetchTopArtists(accessToken)
        .then((data) => {
          this.setState(() => ({
            ...this.state,
            user: {
              ...this.state.user,
              topArtists: data,
            },
          }));
        })
        .then(() => this.updateGenre())
        .then((genre) => {
          this.setState(() => ({
            ...this.state,
            user: {
              ...this.state.user,
              recommendedGenre: genre,
            },
          }));
        }),
    ]).then(() => {
      this.setState(() => ({
        ...this.state,
        allUpdated: true,
      }));
    });
  }

  onUpdate = (content) => {
    this.setState(() => ({
      content,
    }));
    console.log('updated state !');
    // console.log(this.state.contentType)
    // console.log(this.state.content)
  };

  onButtonClick = (type) => {
    this.setState(() => ({
      contentType: type,
    }));
  };

  tooltipRender = (content) => {
    // console.log("!!!!")
    // console.log(content)
    this.setState(() => ({
      country: content,
    }));
  };

  IsValidData = () => {
    const { content, contentType } = this.state;
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

              <ol>{populateCards1}</ol>
            </WidgetWrapper>
          );
        }
        return (
          <WidgetTitle>
            <WidgetTitle style={{ fontSize: '1em' }}>
              Spotify doesn`&apos`t have the data yet. Try Radar Tracks
            </WidgetTitle>
          </WidgetTitle>
        );
      }
      if (contentType === 'viral') {
        if (content[1].length > 0) {
          return (
            <WidgetWrapper>
              <WidgetTitle> Viral 10 Tracks of {content[3]} </WidgetTitle>
              <ol>{populateCards2}</ol>
            </WidgetWrapper>
          );
        }
        return (
          <WidgetTitle>
            <WidgetTitle style={{ fontSize: '1em' }}>
              {' '}
              Spotify doesn`&apos`t have the data yet. Try Radar Tracks{' '}
            </WidgetTitle>
          </WidgetTitle>
        );
      }
      if (content[2].length > 0) {
        return (
          <WidgetWrapper>
            <WidgetTitle> Radar Tracks of {content[3]} </WidgetTitle>
            <ol>{populateCards3}</ol>
          </WidgetWrapper>
        );
      }
      return (
        <WidgetTitle>
          <WidgetTitle style={{ fontSize: '1em' }}>
            {' '}
            Spotify doesn`&apos`t have the data yet. Try other Tracks{' '}
          </WidgetTitle>
        </WidgetTitle>
      );
    }

    if (content[0] === 's') {
      return <WidgetTitle> Click on a country to begin! </WidgetTitle>;
    }
    return <WidgetTitle> Spotify is not supported in {content[0]} !</WidgetTitle>;
  };

  async updateGenre() {
    let genre = [];
    const { user } = this.state;
    user.topArtists.items.slice(0, 15).map((artist) => {
      const temp = artist.genres;
      genre = genre.concat(temp);
      genre = _.uniq(genre);
      return true;
    });
    return genre;
  }

  render() {
    const { allUpdated, user, country } = this.state;

    if (allUpdated) {
      return (
        <Wrapper>
          {/* {console.log(this.state.user)} */}
          <h1 style={{ textAlign: 'center' }}>Welcome</h1>
          <UserModal userObject={user} />
          <Link to="/main">
            <App setTooltipContent={(e) => this.onUpdate(e)} setTooltip={this.tooltipRender} />
          </Link>
          <ButtonWrapper>
            <TriggerButton className="Top10" onClick={() => this.onButtonClick('top')}>
              {' '}
              View Top 10 Tracks
            </TriggerButton>
            <TriggerButton className="Viral10" onClick={() => this.onButtonClick('viral')}>
              {' '}
              View Viral 10 Tracks{' '}
            </TriggerButton>
            <TriggerButton className="Radar" onClick={() => this.onButtonClick('radar')}>
              {' '}
              View Radar Tracks{' '}
            </TriggerButton>
          </ButtonWrapper>
          <this.IsValidData />
          <ReactTooltip>{country}</ReactTooltip>
        </Wrapper>
      );
    }

    console.log('okay page is loading');
    return <h3 style={{ textAlign: 'center' }}>Loading ... </h3>;
  }
}

export default Main;

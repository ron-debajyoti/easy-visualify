import React, { Component } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components/macro';
import queryString from 'query-string';
import render from './Main';
import * as util from '../utils/Utility';

const WrongPage = styled.div`
  color: white;
  font-size: 1.5em;
  text-align: center;
`;
const EXPIRATION_TIME = 60 * 60 * 1000;

// functions required for auth

const setTimestamp = () => {
  window.localStorage.setItem('token_timestamp', Date.now());
};

const getTimestamp = () => Number(window.localStorage.getItem('token_timestamp'));

const getAccessToken = () => Cookies.get('access_token');

const getRefreshToken = () => Cookies.get('refresh_token');

const refreshAccessToken = async (refreshToken) => {
  try {
    const accessToken = await util.getNewAccessToken(refreshToken);
    if (accessToken === undefined || accessToken === null || accessToken.length === 0) return false;

    setTimestamp();
    Cookies.set('access_token', accessToken);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const setTokens = () => {
  const tokens = queryString.parse(window.location.search);
  const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;
  if (util.isInvalid(refreshToken) && util.isInvalid(accessToken)) {
    return false;
  }
  if (util.isInvalid(accessToken) && !util.isInvalid(refreshToken)) {
    console.log('!!!!!!!!!!!!!!!!!!');
    return refreshAccessToken(getRefreshToken());
  }
  Cookies.set('access_token', tokens.access_token);
  Cookies.set('refresh_token', tokens.refresh_token);
  return true;
};

const authenticate = async () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const timePassed = Date.now() - getTimestamp();

  if (util.isInvalid(accessToken)) {
    const result = setTokens();
    if (result) {
      setTimestamp();
      return true;
    }
  }
  if (!util.isInvalid(accessToken) && timePassed < EXPIRATION_TIME) {
    console.log('authentication successful');
    return true;
  }
  if (!util.isInvalid(refreshToken)) {
    console.log('!!!!!!!!!!!!!!!!!!');
    return refreshAccessToken(getRefreshToken());
  }
  return false;
};

/* Authentication Class */
class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
    };
  }

  componentDidMount() {
    authenticate().then((isAuthenticatedState) => {
      this.setState(() => ({
        auth: isAuthenticatedState,
      }));
    });
  }

  render() {
    const { auth } = this.state;
    // return auth ? render(auth) : null;
    if (auth) {
      render();
    }
    console.log('else block here called');
    return <WrongPage> You are not authenticated to access this page </WrongPage>;
  }
}

export default Authenticate;

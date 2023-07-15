import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components/macro';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import Main from './Main';
import * as util from '../utils/Utility';
import { Button, Div, H3 } from './Reusables';

import authGif from '../images/auth.gif';

// const WrongPage = styled.div`
//   color: white;
//   font-size: 1.5em;
//   text-align: center;
// `;

// const Wrap = styled.div`
//   text-align: center;
// `;

/**
 * Auth workflow :
 * check if refresh token exists :
 *  - if null:
 *     - get token
 *     - store token locally
 *     - extract and set refresh token
 *     - pass access tokens
 *  - if not null:
 *     - refresh token
 *     - do the above
 */

const Gif = styled.img`
  max-width: 100%;
  margin: 10px;
  object-fit: contain'
`;

const EXPIRATION_TIME = 60 * 60 * 1000;

// functions required for auth

const setTimestamp = () => {
  Cookies.set('token_timestamp', Date.now());
};

const getTimestamp = () => Number(Cookies.get('token_timestamp'));

const getToken = () => Cookies.get('token');

const getRefreshToken = () => Cookies.get('refresh_token');

const refreshAccessToken = async (refreshToken) => {
  try {
    const accessToken = await util.getNewAccessToken(refreshToken);
    if (util.isInvalid(accessToken)) return false;

    Cookies.set('access_token', accessToken);
    setTimestamp();
    return 1;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

const setTokens = () => {
  const { accessToken, refreshToken } = queryString.parse(window.location.search);

  if (util.isInvalid(refreshToken) && util.isInvalid(accessToken)) {
    Cookies.set('access_token', null);
    Cookies.set('refresh_token', null);
    return false;
  }
  Cookies.set('access_token', accessToken);
  Cookies.set('refresh_token', refreshToken);
  return true;
};

const authenticate = async () => {
  const jwtToken = getToken();
  const token = 
  const refreshToken = getRefreshToken();
  const timePassed = Date.now() - getTimestamp();

  console.log(refreshToken);
  console.log(timePassed < EXPIRATION_TIME);

  if (util.isInvalid(accessToken)) {
    const result = setTokens();
    setTimestamp();
    console.log(result);
    if (result) return 1;

    return 0;
  }
  if (!util.isInvalid(accessToken) && timePassed < EXPIRATION_TIME) {
    return 1;
  }
  if (timePassed > EXPIRATION_TIME && !util.isInvalid(refreshToken)) {
    return refreshAccessToken(getRefreshToken());
  }
  return 0;
};

/* Authentication Class */

const Authenticate = () => {
  const [auth, setAuth] = useState(-1);
  const history = useHistory();
  const routeChange = () => {
    history.push('/');
  };

  useEffect(() => {
    authenticate().then((isAuthenticatedState) => setAuth(isAuthenticatedState));
  }, []);

  if (auth === 1) {
    console.log('CHER  : ');
    return <Main />;
  }
  if (auth === 0) {
    return (
      <Div display="flex" flexDirection="column">
        <H3>The authentication was not successful. Please head back</H3>
        <Button onClick={routeChange}> Back </Button>
      </Div>
    );
  }

  return (
    <Div
      className="div-authenticating"
      textAlign="center"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Div classname="div-authenticate-text" color="white" fontSize="1.5em" textAlign="center">
        {' '}
        Authenticating{' '}
      </Div>
      <Gif src={authGif} alt="loading..." />
    </Div>
  );
};

export default Authenticate;

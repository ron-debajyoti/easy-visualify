import React, { Component } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import queryString from 'query-string';
import Main from './Main';
import * as util from '../utils/Utility';

const WrongPage = styled.div`
  font-size: 1.5em;
  text-align: center;
`;
const EXPIRATION_TIME = 60 * 60 * 1000;

// functions required for auth

const setTimestamp = () => {
  window.localStorage.setItem('token_timestamp', Date.now());
};

const getTimestamp = () => window.localStorage.getItem('token_timestamp');

const getAccessToken = () => Cookies.get('access_token');

const getRefreshToken = () => Cookies.get('refresh_token');

// const redirectToLogin = () => {
//   console.log('this is called');
//   this.props.history.push('/');
// };

const setTokens = () => {
  const tokens = queryString.parse(window.location.search);
  if (util.isEmpty(tokens)) {
    return false;
  }

  setTimestamp();
  Cookies.set('access_token', tokens.access_token);
  Cookies.set('refresh_token', tokens.refresh_token);
  return true;
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const accessToken = await util.getNewAccessToken(refreshToken);
    if (accessToken === undefined || accessToken === null) return false;

    setTimestamp();
    Cookies.set('access_token', accessToken);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const authenticate = async () => {
  // console.log("k")
  if (getRefreshToken() && getAccessToken() && Date.now() - getTimestamp() < EXPIRATION_TIME) {
    console.log('authentication successful');
    return true;
  }
  refreshAccessToken(getRefreshToken());
  return false;
};

const isAuthenticated = () => {
  const temp = getAccessToken();
  if (temp === undefined || Date.now() - getTimestamp() > EXPIRATION_TIME) {
    const reToken = getRefreshToken();
    if (reToken === undefined) return false;

    return refreshAccessToken(reToken);
  }
  return true;
};

const propTypes = {
  render: PropTypes.func.isRequired,
};

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
    const { render } = this.props;
    console.log(auth);
    console.log(this.props);
    return auth ? render() : null;
  }
}

Authenticate.propTypes = propTypes;

// Final FC
const AuthenticatedRoute = () => {
  const temp = isAuthenticated();

  const temp2 = setTokens();
  // console.log(temp)
  // console.log(temp2)
  if (temp || temp2) {
    // console.log('yaya')
    return <Authenticate render={() => <Main />} />;
  }
  console.log('else block here called');
  return <WrongPage>You are not authenticated to access this page </WrongPage>;

  // return (temp ?
  //             (<Authenticate render={() => <Main />}/>) :
  //             (<WrongPage>You are not authenticated to access this page </WrongPage>))
};

export default AuthenticatedRoute;

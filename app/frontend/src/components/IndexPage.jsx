import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Authenticate from './Authenticate';
import { Button, H1, H3 } from './Reusables';

import Background from '../images/background.jpeg';

const Wrapper = styled.main`
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // background-image: url(${Background});
`;

function IndexPage() {
  const mainPage = () => (
    <Wrapper className="index-wrapper">
      <H1 fontSize="xx-large">Easy Visualify</H1>
      <H3 fontSize="large">
        {' '}
        Find out Spotify&apos;s Top10, Viral10 and Radar charts for countries across the world
      </H3>
      <Link to="/">
        <Button
          backgroundColor="rgb(29, 185, 84)"
          onClick={() => {
            window.location.href = process.env.REACT_APP_AUTH_URL;
          }}
        >
          Log in using Spotify
        </Button>
      </Link>
    </Wrapper>
  );

  return (
    <Switch>
      <Route exact path="/" component={mainPage} />
      <Route path="/main" component={Authenticate} />
    </Switch>
  );
}

export default IndexPage;

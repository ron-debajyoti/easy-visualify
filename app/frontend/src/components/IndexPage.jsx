import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import Authenticate from './Authenticate';
import Background from '../images/background.jpeg';

const Title = styled.h1`
  font-size: 2em;
  margin: 10px 10px 50px;
  color: white;
  float: center;
`;

const About = styled.h3`
  color: white;
`;

const Wrapper = styled.main`
  height: 100%;
  min-height: 100vh;
  box-sizing: inherit;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${Background});
`;
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  background-color: rgb(29, 185, 84);
  color: white;
  text-align: center;
  border: 2px solid black;
  border-radius: 20px;
`;

function IndexPage() {
  const mainPage = () => (
    <Wrapper>
      <Title>Easy Visualify</Title>
      <About>
        {' '}
        Find out Spotify&apos;s Top10, Viral10 and Radar charts for countries across the world
      </About>
      <Link to="/">
        <Button
          onClick={() => {
            window.location.href = process.env.REACT_APP_AUTH_URL;
          }}
        >
          Log In
        </Button>
      </Link>
    </Wrapper>
  );

  return (
    <Route>
      <Switch>
        <Route exact path="/" component={mainPage} />
        <Route path="/main" component={Authenticate} />
      </Switch>
    </Route>
  );
}

export default IndexPage;

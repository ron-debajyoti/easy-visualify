import React, {Component} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import styled from 'styled-components/macro'
import {AuthenticatedRoute} from './Authenticate'
import Main from './Main'
import Cookies from 'js-cookie'

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
`
const Wrapper = styled.div`
    padding: 4em;
`
const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    text-align = center;
    border: 2px solid palevioletred;
    border-radius: 3px;
`

class IndexPage extends Component{

    mainPage = () => {
        return(
            <Wrapper>
                <Title>
                    Easy Visualify
                </Title>
                <Link to='/'>
                    <Button onClick={() => {window.location.href = process.env.REACT_APP_AUTH_URL || "localhost:3001/login"}}>
                        Log In
                    </Button>
                </Link>
            </Wrapper>
        )    
    }


    render(){
        return(
            <Route>
                <Switch>
                    <Route exact path='/' component={this.mainPage} />
                    <Route path='/main' render={() => AuthenticatedRoute()}/>
                </Switch>
            </Route>
        )

    }


}


export default IndexPage 
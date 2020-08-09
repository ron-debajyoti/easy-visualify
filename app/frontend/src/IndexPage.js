import React, {Component} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import styled from 'styled-components/macro'
require('dotenv').config()

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
                <Link to='/login'>
                    <Button onClick={() => { 
                        var url = process.env.AUTH_URL || 'http://localhost:3001/login'; 
                        window.location.href= url}
                        }> Click to Enter </Button>
                </Link>
            </Wrapper>
        )    
    }
    

    render(){
        return(
            <Route>
                <Switch>
                    <Route exact path='/' component={this.mainPage} />
                    <Route path='/main' component={() => {
                    }} />
                </Switch>
            </Route>
        )

    }


}


export default IndexPage 
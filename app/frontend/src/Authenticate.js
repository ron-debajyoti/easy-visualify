import React,{ Component } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components/macro'
import queryString from 'query-string'
import Main from './Main'
import * as util from './utils/Utility'

const WrongPage = styled.div`
    font-size: 1.5em;
    text-align: center
`


const getAccessToken = () => Cookies.get('access_token')
const getRefreshToken = () => Cookies.get('refresh_token')
const isAuthenticated = () => {
    const temp = getAccessToken()
    if(temp === undefined) return false
    else return true
}

const redirectToLogin = () => {
    console.log('this is called')
    this.history.push('/login')
  }


const setTokens = () => {
    const tokens = queryString.parse(window.location.search)
    if(util.isEmpty(tokens)){
        return false
    }
    else{
        // console.log(tokens.access_token)
        const expires = (tokens.expires_in || 60*60 ) * 1000
        const oneHour = new Date(new Date().getTime() + expires)

        Cookies.set('access_token',tokens.access_token, {expires : oneHour})
        Cookies.set('refresh_token', tokens.refresh_token)
        return true
    }
    
}


const authenticate = async () => {
    // console.log("k")
    if(getRefreshToken() && getAccessToken()){
      return true
    }
    redirectToLogin()
    return false
  }
  


class Authenticate extends Component{
    constructor(){
        super()
        this.state = {
            isAuthenticated: false
        }
    }

    componentDidMount(){
        authenticate()
        .then(isAuthenticated => {
            this.setState(() => ({
                isAuthenticated
            }))
        })
        
    }

    render(){
        console.log(this.state.isAuthenticated)
        return this.state.isAuthenticated ? this.props.render() : null
    }

}


export const AuthenticatedRoute =() => {
    var temp = isAuthenticated()
    // console.log(temp)
    var temp2 = setTokens()
    // console.log(temp2)
    if(temp || temp2 ){
        // console.log('yaya')
        return (
            <Authenticate render={() => <Main />} />
        )
    }
    else{
        console.log('else block here called')
        return(
            <WrongPage>You are not authenticated to access this page </WrongPage>
        )
       
    }
    // return (temp ? 
    //             (<Authenticate render={() => <Main />}/>) :
    //             (<WrongPage>You are not authenticated to access this page </WrongPage>))
}
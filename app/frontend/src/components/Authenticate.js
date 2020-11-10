import React,{ Component } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components/macro'
import queryString from 'query-string'
import Main from './Main'
import * as util from '../utils/Utility'

const WrongPage = styled.div`
    font-size: 1.5em;
    text-align: center
`
const EXPIRATION_TIME = 60*60*1000

const setTimestamp = () => {
    window.localStorage.setItem('token_timestamp',Date.now())
}
const getTimestamp = () => window.localStorage.getItem('token_timestamp')
const getAccessToken = () => Cookies.get('access_token')
const getRefreshToken = () => Cookies.get('refresh_token')
const isAuthenticated = () => {
    const temp = getAccessToken()
    if(temp === undefined || ((Date.now()-getTimestamp())>EXPIRATION_TIME ) ){
        var re_token = getRefreshToken()
        if(re_token === undefined) return false
        else{
            return refreshAccessToken(re_token)
        }
    }
    else return true
}

const redirectToLogin = () => {
    console.log('this is called')
    this.props.history.push('/')
  }


const setTokens = () => {
    const tokens = queryString.parse(window.location.search)
    if(util.isEmpty(tokens)){
        return false
    }
    else{
        setTimestamp()
        Cookies.set('access_token',tokens.access_token)
        Cookies.set('refresh_token', tokens.refresh_token)
        return true
    }
    
}

const refreshAccessToken = async (refresh_token) => {
    try{
        var access_token = await util.getNewAccessToken(refresh_token)
        if(access_token === undefined || access_token === null)return false
        else{
            setTimestamp()
            Cookies.set('access_token',access_token)
            return true
        }
    }
    catch(e){
        console.error(e)
    }
}


const authenticate = async () => {
    // console.log("k")
    if(getRefreshToken() && getAccessToken() && ((Date.now()-getTimestamp())< EXPIRATION_TIME )){
        console.log('problem in here ')
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
    
    var temp2 = setTokens()
    //console.log(temp)
    //console.log(temp2)
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
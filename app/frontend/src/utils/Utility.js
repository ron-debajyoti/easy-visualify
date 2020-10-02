require('dotenv').config()
const fetch = require('node-fetch')

var url = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/request/"
var url2 = process.env.REACT_APP_AUTHEN_URL || 'http://localhost:8888/refresh_token'
export const fetchData = () => 
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .catch( err => console.log(err))


export const getNewAccessToken = (refresh_token) =>{
    return fetch(url2, {
        method:'GET',
        headers: {
            refresh_token: refresh_token
        }
    })
    .catch(err => console.log(err))
}



export const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
}

export const fetchUserData = (access_token) =>
    fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))

export const fetchTopTracks = (access_token) =>
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=medium_term', {
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .then(response => {
        if(response.items.count < 0)
            throw "Empty item"
        else{
            return response
        }
    })
    .catch(err => console.log(err))

export const fetchUserPlaylists = (access_token) => 
    fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))


export const fetchTracksfromPlaylists = (access_token, href,offset) => 
    fetch(href+`/tracks?limit=100&fields=items(track(id))&offset=${offset}`,{
        method: 'GET',
        headers: {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))


export const fetchTopArtists = (access_token) => 
    fetch('https://api.spotify.com/v1/me/top/artists?limit=12&time_range=medium_term',{
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))

export const fetchAudioFeatures = (access_token,id) => 
    fetch(`https://api.spotify.com/v1/audio-features/${id}`,{
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))

export const fetchAudioFeaturesForMultipleTracks = (access_token, arrayIds) => 
    fetch(`https://api.spotify.com/v1/audio-features/?ids=${arrayIds}`,{
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))


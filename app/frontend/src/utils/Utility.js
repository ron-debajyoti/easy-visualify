require('dotenv').config()
const fetch = require('node-fetch')

var url = process.env.BACKEND_URL || "https://easy-visualify-backend.herokuapp.com/request/"
export const fetchData = () => 
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .catch( err => console.log(err))


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
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=12&time_range=medium_term', {
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))

export const fetchTopArtists = (access_token) => 
    fetch('https://api.spotify.com/v1/me/top/artists?limit=12&time_range=medium_term',{
        headers : {'Authorization': ' Bearer ' + access_token}
    })
    .then(response => response.json())
    .catch(err => console.log(err))
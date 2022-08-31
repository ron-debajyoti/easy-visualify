require('dotenv').config();
const fetch = require('node-fetch');

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/request/';
const url2 = process.env.REACT_APP_AUTHEN_URL || 'http://localhost:8888/refresh_token';
export const fetchData = () =>
  fetch(url, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

export const getNewAccessToken = (refreshToken) =>
  fetch(url2, {
    method: 'GET',
    headers: {
      refresh_token: refreshToken,
    },
  })
    .then((response) => response.json())
    .then((resp) => {
      const accessToken = resp.access_token;
      return accessToken;
    })
    .catch((err) => console.log(err));

export const isInvalid = (token) => {
  if (token === undefined || token === null || token.length < 10) return true;
  return false;
};

export const isInvalidInput = (input) => {
  if (input === undefined || input === null) return true;
  return false;
};

export const fetchUserData = (accessToken) => {
  console.log(accessToken);
  return fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

export const fetchTopTracks = (accessToken, timeRange) =>
  fetch(`https://api.spotify.com/v1/me/top/tracks?limit=30&time_range=${timeRange}`, {
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((respo) => respo.json())
    .then((respon) => {
      if (respon.items.count < 0) {
        const error = { code: 403, message: 'Empty item' };
        throw error;
      } else {
        return respon;
      }
    })
    .catch((err) => console.log(err));

export const fetchUserPlaylists = (accessToken) =>
  fetch('https://api.spotify.com/v1/me/playlists', {
    method: 'GET',
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((respons) => respons.json())
    .catch((err) => console.log(err));

export const fetchTracksfromPlaylists = (accessToken, href, offset) =>
  fetch(`${href}/tracks?limit=100&fields=items(track(id))&offset=${offset}`, {
    method: 'GET',
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response1) => response1.json())
    .catch((err) => console.log(err));

export const fetchTopArtists = (accessToken, timeRange) =>
  fetch(`https://api.spotify.com/v1/me/top/artists?limit=12&time_range=${timeRange}`, {
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response2) => response2.json())
    .catch((err) => console.log(err));

export const fetchAudioFeatures = (accessToken, id) =>
  fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response3) => response3.json())
    .catch((err) => console.log(err));

export const fetchAudioFeaturesForMultipleTracks = (accessToken, arrayIds) =>
  fetch(`https://api.spotify.com/v1/audio-features/?ids=${arrayIds}`, {
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response4) => response4.json())
    .catch((err) => console.log(err));

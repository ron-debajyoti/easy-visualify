import {
  fakePlaylistMap,
  fakeUser,
  topArtists,
  topTracks,
  fakeFetchUserPlaylistData,
} from './fakeData';

const fetchData = async () => fakePlaylistMap;

const fetchUserData = async () => fakeUser;

const fetchTopTracks = async () => topTracks;

const fetchUserPlaylists = async () => fakeFetchUserPlaylistData;

const fetchTopArtists = async () => topArtists;

const mockUseEffect = async () => fakeUser;

const isInvalid = (token) => {
  if (token === undefined || token === null || token.length < 10) return true;
  return false;
};

const isInvalidInput = (input) => {
  if (input === undefined || input === null) return true;
  return false;
};

const fetchTracksfromPlaylists = async (accessToken, href, offset) =>
  fetch(`${href}/tracks?limit=100&fields=items(track(id))&offset=${offset}`, {
    method: 'GET',
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response1) => response1.json())
    .catch((err) => console.log(err));

const fetchAudioFeatures = async (accessToken, id) =>
  fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response3) => response3.json())
    .catch((err) => console.log(err));

const fetchAudioFeaturesForMultipleTracks = async (accessToken, arrayIds) =>
  fetch(`https://api.spotify.com/v1/audio-features/?ids=${arrayIds}`, {
    headers: { Authorization: ` Bearer ${accessToken}` },
  })
    .then((response4) => response4.json())
    .catch((err) => console.log(err));

export {
  isInvalid,
  isInvalidInput,
  fetchTracksfromPlaylists,
  fetchAudioFeatures,
  fetchAudioFeaturesForMultipleTracks,
  fetchData,
  fetchUserData,
  fetchTopTracks,
  fetchTopArtists,
  fetchUserPlaylists,
  mockUseEffect,
};

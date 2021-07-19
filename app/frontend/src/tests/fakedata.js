const recommendedGenre = ['dmv rap', 'hip hop', 'pop rap', 'rap', 'modern rock'];
const images1 = [
  {
    height: 320,
    url: 'https://i.scdn.co/image/ab6775700000ee852a13b40cc67cc6f016afe925',
    width: 320,
  },
];

const images2 = [
  {
    height: 640,
    url: 'https://i.scdn.co/image/3a836196bfb341f736c7fe2704fb75de53f8dfbb',
    width: 640,
  },
];

/// For Widget and SongRenderer //////////////////////////////////////////////////////////
const fakeTrackUri = 'spotify:track:4KD0lLJ4OGonZhBeKtct9I';
const fakeTrackUri2 = '4M6XHrTc4RtdgKN9gzEAM6';
const fakePlaylistUri = 'spotify:playlist:6sDvv5SNASdsfeeww';
const fakePlaylistUri2 = '37i9dQZF1DWY0DyDKedRYY';

const fakeArtistData = {
  external_urls: { spotify: 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg' },
  followers: { href: null, total: 17587070 },
  genres: ['conscious hip hop', 'hip hop', 'rap'],
  href: 'https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg',
  id: '2YZyLoL8N0Wb9xBt1NhZWg',
  images: [images2, images2, images2],
  name: 'Kendrick Lamar',
  popularity: 89,
  type: 'artist',
  uri: 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg',
};

const fakeAlbumData1 = {
  album_type: 'ALBUM',
  artists: [fakeArtistData],
  available_markets: ['AD', 'AE', 'AR', 'US'],
  external_urls: { spotify: 'https://open.spotify.com/album/3uyOwJu4r3yroAkFywNFM3' },
  href: 'https://api.spotify.com/v1/albums/3uyOwJu4r3yroAkFywNFM3',
  id: '3uyOwJu4r3yroAkFywNFM3',
  images: [images1, images1, images1],
  name: 'Culture III',
  release_date: '2021-02-01',
  release_date_precision: 'day',
  total_tracks: 19,
  type: 'album',
  uri: 'spotify:album:3uyOwJu4r3yroAkFywNFM3',
};

const fakeAlbumData2 = {
  album_type: 'SINGLE',
  artists: [fakeArtistData],
  available_markets: ['AD', 'AE', 'AR', 'US'],
  external_urls: { spotify: 'https://open.spotify.com/album/71qxIkZvfyFGQKUe9YA0ry' },
  href: 'https://api.spotify.com/v1/albums/71qxIkZvfyFGQKUe9YA0ry',
  id: '71qxIkZvfyFGQKUe9YA0ry',
  images: [images1, images1, images1],
  name: 'Culture III',
  release_date: '2021-02-01',
  release_date_precision: 'day',
  total_tracks: 19,
  type: 'album',
  uri: 'spotify:album:71qxIkZvfyFGQKUe9YA0ry',
};

const fakeTrackData1 = {
  album: fakeAlbumData1,
  artists: [fakeArtistData],
  available_markets: ['AD', 'AE', 'AR'],
  disc_number: 1,
  duration_ms: 206271,
  explicit: true,
  external_ids: { isrc: 'USUG12101634' },
  external_urls: { spotify: 'https://open.spotify.com/track/4KD0lLJ4OGonZhBeKtct9I' },
  href: 'https://api.spotify.com/v1/tracks/4KD0lLJ4OGonZhBeKtct9I',
  id: '4KD0lLJ4OGonZhBeKtct9I',
  is_local: false,
  name: 'Avalanche',
  popularity: 78,
  preview_url: null,
  track_number: 1,
  type: 'track',
  uri: fakeTrackUri,
};

const fakeTrackData2 = {
  album: fakeAlbumData2,
  artists: [fakeArtistData],
  available_markets: ['AD', 'AE', 'AR'],
  disc_number: 1,
  duration_ms: 206271,
  explicit: true,
  external_ids: { isrc: 'USRC12100215' },
  external_urls: { spotify: 'https://open.spotify.com/track/3uOIoS7lOvzQAtbbyttHp6' },
  href: 'https://api.spotify.com/v1/tracks/3uOIoS7lOvzQAtbbyttHp6',
  id: '3uOIoS7lOvzQAtbbyttHp6',
  is_local: false,
  name: 'BUZZCUT',
  popularity: 60,
  preview_url: null,
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:3uOIoS7lOvzQAtbbyttHp6',
};

// For RadarChart

const fakeRadarChartLabelObject1 = {
  backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(179,181,198,1)',
  data: [0.6, 0.5, 0.4, 0.53, 0.21],
  label: 'Trial Data Check 1',
  pointBackgroundColor: 'rgba(179,181,198,1)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(179,181,198,1)',
};

const fakeRadarChartLabelObject2 = {
  backgroundColor: '#3315ce8b',
  borderColor: '#33746c93',
  data: [0.622, 0.335, 0.114, 0.53, 0.921],
  label: 'Trial Data Check 2',
  pointBackgroundColor: '#33746c93',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: '#33746c93',
};

const fakeRadarChartData = {
  labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
  datasets: [fakeRadarChartLabelObject1, fakeRadarChartLabelObject2],
};

/// ////////////////////////////////////////

const fakeUserPlaylist = {
  collaborative: false,
  description: 'Mainly work rap jam and all time high songs',
  external_urls: { spotify: 'https://open.spotify.com/playlist/6sDvdsfdf449' },
  href: 'https://api.spotify.com/v1/playlists/6sDvv5ew',
  id: '6sDvv5SNAwNK9',
  images: [images1, images1, images1],
  name: 'Fake Playlist 1',
  owner: {
    display_name: 'Ron',
    href: 'https://api.spotify.com/v1/users/ronwilson69',
    id: 'ronwilson69',
    type: 'user',
    uri: 'spotify:user:ronwilson69',
  },
  primary_color: null,
  public: true,
  snapshot_id: 'MTU2Niw4NGE',
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/6sDvv5hdsufusd/tracks',
    total: 940,
  },
  type: 'playlist',
  uri: fakePlaylistUri,
};

const topTracks = [fakeTrackData1, fakeTrackData2, fakeTrackData1];

const topArtists = {
  href: null,
  limit: 12,
  items: [fakeArtistData, fakeArtistData],
  next: null,
  offset: 0,
  previous: null,
  total: 50,
};

const userPlaylists = [fakeUserPlaylist, fakeUserPlaylist];

const fakeUser = {
  country: 'US',
  display_name: 'Ron',
  external_urls: {
    spotify: 'https://open.spotify.com/user/ronwilson69',
  },
  followers: 7,
  images: images1,
  product: 'open',
  recommendedGenre,
  topTracksRecent: topTracks,
  topTracksMedium: topTracks,
  topTracksLong: topTracks,
  topArtistsRecent: topArtists,
  topArtistsMedium: topArtists,
  topArtistsLong: topArtists,
  userPlaylists,
};

export {
  fakeUser,
  fakeTrackUri,
  fakeTrackUri2,
  fakePlaylistUri,
  fakePlaylistUri2,
  fakeRadarChartData,
};

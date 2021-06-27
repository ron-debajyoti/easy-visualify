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

const fakeTrackData = {
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
  uri: 'spotify:track:4KD0lLJ4OGonZhBeKtct9I',
};

const fakeArtistData = {
  external_urls: { spotify: 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg' },
  followers: { href: null, total: 17587070 },
  genres: ['conscious hip hop', 'hip hop', 'rap'],
  href: 'https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg',
  id: '2YZyLoL8N0Wb9xBt1NhZWg',
  images: images2,
  name: 'Kendrick Lamar',
  popularity: 89,
  type: 'artist',
  uri: 'spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg',
};

const fakeUserPlaylist = {
  collaborative: false,
  description: 'Mainly work rap jam and all time high songs',
  external_urls: { spotify: 'https://open.spotify.com/playlist/6sDvdsfdf449' },
  href: 'https://api.spotify.com/v1/playlists/6sDvv5ew',
  id: '6sDvv5SNAwNK9',
  images: images1,
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
  uri: 'spotify:playlist:6sDvv5SNASdsfeeww',
};

const topTracks = [fakeTrackData, fakeTrackData, fakeTrackData];

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

const user = {
  country: 'US',
  display_name: 'Ron',
  external_urls: {
    spotify: 'https://open.spotify.com/user/ronwilson69',
  },
  followers: 7,
  images1,
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

export default user;

require('dotenv').config();
const jwt = require('jsonwebtoken');
const mcache = require('memory-cache');
const { MongoClient, ServerApiVersion } = require('mongodb');
const fetch = require('node-fetch');
const config = require('config');

const { host } = config.get('nosqlDatabase');
const {
  redirectUri: spotifyRedirectUri,
  clientId: spotifyClientId,
  clientSecret: spotifyClientSecret,
} = config.get('spotify');
const { secret: jwtSecret } = config.get('jwt');

const requestRoute = async (requestBody) => {
  try {
    const key = `__express__${requestBody.originalUrl}` || requestBody.url;
    const cachedBody = mcache.get(key);
    if (cachedBody && cachedBody.length === 2) {
      return cachedBody;
    }
    const client = await MongoClient.connect(host, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      useUnifiedTopology: true,
    });
    const db = client.db('visualify');
    const topPlaylists = db.collection('myCollection');
    const viralPlaylists = db.collection('viralCollections');

    const task1 = await topPlaylists.find().toArray();
    const task2 = await viralPlaylists.find().toArray();
    const data = JSON.stringify([task1, task2]);

    mcache.put(key, [task1, task2], 30 * 1000);
    return {
      status: 200,
      message: data,
    };
  } catch (error) {
    console.log(`Error encountered : ${error.message}`);
    return {
      status: 500,
      message: `Error encountered : ${error.message}`,
    };
  }
};

const loginRoute = async () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: 'user-read-private user-read-email user-library-read user-top-read user-follow-read',
    redirect_uri: spotifyRedirectUri,
  });

  return {
    url: `https://accounts.spotify.com/authorize?${params.toString()}`,
  };
};

const callbackLoginRoute = async (code) => {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    )}`,
  };

  const requestConfig = {
    method: 'POST',
    headers,
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: spotifyRedirectUri,
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', requestConfig);
    if (!response.ok) throw new Error('response error');
    const { access_token: accessToken, refresh_token: refreshToken } = await response.json();

    const token = jwt.sign({ tokens: { accessToken, refreshToken } }, jwtSecret);
    console.log(token);
    return token;
  } catch (error) {
    console.log(`Error encountered while fetching tokens : ${error.message} `);
    throw error;
  }
};

const refreshTokenRoute = async (query) => {
  const { oldRefreshToken } = query;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    )}`,
  };

  const requestConfig = {
    method: 'POST',
    headers,
    body: new URLSearchParams({
      refresh_token: oldRefreshToken,
      grant_type: 'refresh_token',
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', requestConfig);
    if (!response.ok) throw new Error(response.error);

    const { access_token: accessToken, refresh_token: newRefreshToken } = await response.json();
    const token = jwt.sign({ tokens: { accessToken, newRefreshToken } }, jwtSecret);
    return token;
  } catch (error) {
    console.log(`Error encountered while fetching tokens : ${error} `);
    throw error;
  }
};

module.exports = {
  requestRoute,
  loginRoute,
  callbackLoginRoute,
  refreshTokenRoute,
};

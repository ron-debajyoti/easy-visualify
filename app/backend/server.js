require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mcache = require('memory-cache');
const querystring = require('querystring');
const mongoclient = require('mongodb').MongoClient;
const fetch = require('node-fetch');

const app = express();
app.set('json spaces', 2);
const port = process.env.PORT || 3001;
const address = process.env.MONGODB_HOST || 'mongodb://localhost:27017/';

const spotifyRedirectUri = process.env.REDIRECT_URI || 'http://localhost:3001/callback';
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/request', async (req, res) => {
  try {
    const key = `__express__${req.originalUrl}` || req.url;
    const cachedBody = mcache.get(key);
    if (cachedBody && cachedBody.length === 2) {
      res.send(cachedBody);
    } else {
      console.log('11111');
      mongoclient.connect(address, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        const db = client.db('visualify');
        const topPlaylists = db.collection('myCollection');
        const viralPlaylists = db.collection('viralCollections');

        const task1 = new Promise((resolve, reject) => {
          topPlaylists.find().toArray((error, result) => {
            if (error) return reject(EvalError);
            return resolve({ topPlaylists: result });
          });
        });

        const task2 = new Promise((resolve, reject) => {
          viralPlaylists.find().toArray((error, result) => {
            if (error) return reject(error);
            return resolve({ viralPlaylists: result });
          });
        });

        Promise.all([task1, task2]).then((data) => {
          mcache.put(key, data, 30 * 1000);
          return res.send(JSON.stringify(data));
        });
      });
    }
  } catch {
    res.status(500).json('Server Error ! ');
  }
});

app.get('/login', (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email user-library-read user-top-read user-follow-read',
      redirect_uri: spotifyRedirectUri,
    })}`
  );
});

app.get('/callback', async (req, res) => {
  const codeQuery = req.query.code || null;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    )}`,
  };

  const config = {
    method: 'POST',
    headers,
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: codeQuery,
      redirect_uri: spotifyRedirectUri,
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', config);
    if (!response.ok) throw new Error('response error');

    const body = await response.json();
    const { access_token: accessToken } = body;
    const { refresh_token: refreshToken } = body;

    const uri = process.env.FRONTEND_URI || 'http://localhost:3000/main';
    // res.redirect(uri + '?access_token=' + access_token)
    res.redirect(
      `${uri}/?${querystring.stringify({
        accessToken,
        refreshToken,
      })}`
    );
  } catch (error) {
    console.log(`Error encountered while fetching tokens : ${error} `);
    throw error;
  }
});

app.get('/refresh_token', async (req, res) => {
  const { oldRefreshToken } = req.query;

  const headers = {
    Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    )}`,
  };

  const config = {
    method: 'POST',
    headers,
    body: new URLSearchParams({
      refresh_token: oldRefreshToken,
      grant_type: 'refresh_token',
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', config);
    if (!response.ok) throw new Error('response error');

    const body = await response.json();
    const { access_token: accessToken } = body;
    const { refresh_token: newRefreshToken } = body;

    const uri = process.env.FRONTEND_URI || 'http://localhost:3000/main';
    // res.redirect(uri + '?access_token=' + access_token)
    res.redirect(
      `${uri}/?${querystring.stringify({
        accessToken,
        newRefreshToken,
      })}`
    );
  } catch (error) {
    console.log(`Error encountered while fetching tokens : ${error} `);
    throw error;
  }
});

module.exports = app;
console.log(`Listening on port ${port}`);
app.listen(port);

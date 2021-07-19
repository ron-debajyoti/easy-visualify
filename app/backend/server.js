require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoclient = require('mongodb').MongoClient;

const app = express();
app.set('json spaces', 2);
const port = process.env.PORT || 3001;
const address = process.env.MONGODB_HOST || 'mongodb://localhost:27017/';

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/request', (req, res) => {
  mongoclient.connect(address, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    // const messageData = [];
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

    Promise.all([task1, task2])
      .then((data) => res.send(JSON.stringify(data)))
      .then(() => console.log('Data sent !'));
  });
});

app.get('/login', (req, res) => {
  const redirectUri = process.env.AUTH_URL;
  console.log('Redirected ! ');
  res.redirect(redirectUri);
});

// app.get('/refresh_token', (req, res) => {
//   console.log('wt');
//   const { refreshToken } = req.query;
//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       Authorization: `Basic ${new Buffer.from(
//         `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//       ).toString('base64')}`,
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refreshToken,
//     },
//     json: true,
//   };
// });

module.exports = app;
console.log(`Listening on port ${port}`);
app.listen(port);

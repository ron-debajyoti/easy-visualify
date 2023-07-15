const express = require('express');
const config = require('config');
const cors = require('cors');
const { requestRoute, loginRoute, callbackLoginRoute, refreshTokenRoute } = require('./router');

const app = express();
app.set('json spaces', 2);
const port = process.env.PORT || 3001;

const { frontend: { main: frontendUrl } = {} } = config.get('easyVisualify');

app.use(cors());
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/request', async (req, res) => {
  const result = await requestRoute(req);
  res.status(result.status).send(result.data);
});

app.get('/login', async (_, res) => {
  const { url } = await loginRoute();
  res.redirect(url);
});

app.get('/callback', async (req, res) => {
  const { query: { code: codeQuery = '' } = {} } = req;
  const token = await callbackLoginRoute(codeQuery);
  res.redirect(`${frontendUrl}/${token}`);
});

app.get('/refresh_token', async (req, res) => {
  const { query } = req;
  const token = await refreshTokenRoute(query);
  res.redirect(`${frontendUrl}/${token}`);
});

module.exports = app;
console.log(`Listening on port ${port}`);
app.listen(port);

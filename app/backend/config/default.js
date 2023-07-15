require('dotenv').config();

module.exports = {
  easyVisualify: {
    frontend: {
      main: process.env.FRONTEND_URI || 'http://localhost:3000/main',
    },
  },
  nosqlDatabase: {
    host: process.env.MONGODB_HOST || 'mongodb://localhost:27017/',
  },
  spotify: {
    redirectUri: process.env.REDIRECT_URI || 'http://localhost:3001/callback',
    clientId: process.env.SPOTIFY_CLIENT_ID || 'PLACEHOLDER',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'PLACEHOLDER_SECRET',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
};

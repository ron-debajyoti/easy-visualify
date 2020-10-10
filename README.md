# easy-visualify
> A web application for visualizing Top 10, Viral 10 charts across the world and some personalized data.

Built with a couple of frameworks and tools, some of them are :

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Express](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
- [Styled Components](https://www.styled-components.com/)
- [MongoDB for database](https://docs.mongodb.com/manual/)
- [React Simple Maps](https://www.react-simple-maps.io/)
- [React Chartjs 2](https://github.com/jerairrest/react-chartjs-2)

## Setup
1. First [Register a Spotify App](https://developer.spotify.com/dashboard/applications). 
1. Create your own MongoDB cluster in the MongoDB Cloud.
1. Create a simple auth server at a port. Check this [repository](https://github.com/ron-debajyoti/auth) for a guide. Your server URI can be like this: `http://localhost:8888`.
1. Add `http://localhost:8888/callback` as a Redirect URI in your spotify App settings.
1. Fork and clone the repo and use `npm install` in the root and also in the app/frontend and app/backend directory folder (just in case!)
1. Create `.env` files in app/frontend, app/backend and in extractor directory folder based on the example.
1. To run the extractor 
  1. First enter into virtualenv by running : `source .venv/bin/activate` and `pip install -r requirements.txt`.
  1. Then run `extract_top.py` and `extract_viral.py`.

## Deploying to Heroku
1. Create new Heroku for each of frontend and backend of app.
1. Set the Heroku environment variables accordingly. I used a Heroku buildpack [Multi Procfile buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile). To use the same, set the Procfiles in the proper locations and set the required buildpack variables accordingly.
1. Push to Heroku.
1. Add `https://yourapp.herokuapp.com/callback` as a Redirect URI in the settings of your Spotify application.


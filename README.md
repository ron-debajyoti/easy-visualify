# easy-visualify
A web application done as a personal project that visualizes Spotify's Daily Top, Daily Viral, Radar and Weekly Top charts across a world map and along with user's personalized statistics like Most Listened Tracks, Artists, Genre and User Playlists.

Built with a couple of frameworks and tools, some of them are :

- [Create React App](https://github.com/facebook/create-react-app)
- [enzyme](https://github.com/enzymejs/enzyme)
- [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json)
- [express](https://expressjs.com/)
- [husky](https://github.com/typicode/husky)
- [MongoDB for database](https://docs.mongodb.com/manual/)
- [react router](https://reactrouter.com/)
- [react simple maps](https://www.react-simple-maps.io/)
- [react chartjs 2](https://github.com/jerairrest/react-chartjs-2)
- [react modal](https://github.com/reactjs/react-modal)
- [styled components](https://www.styled-components.com/)
- [styled media query](https://github.com/morajabi/styled-media-query)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

Hosted on Heroku [live](https://easy-visualify.herokuapp.com/).

## Setup
1. First [Register a Spotify App](https://developer.spotify.com/dashboard/applications). 
1. Create your own MongoDB cluster in the MongoDB Cloud.
1. Create a simple auth server at a port. Check this [repository](https://github.com/ron-debajyoti/auth) for a guide. Your server URI can be like this: `http://localhost:8888`.
1. Add `http://localhost:8888/callback` as a Redirect URI in your spotify App settings.
1. Fork and clone the repo and use `npm install` in the root and also in the app/frontend and app/backend directory folder (just in case to prevent breaking!)
1. Create `.env` files in app/frontend, app/backend and in extractor directory folder based on the example. Add your relevant links like MongoDB cluster url, Auth url and backend url accordingly.
1. To run the extractor 
  1. First enter into virtualenv by running : `source .venv/bin/activate` and `pip install -r requirements.txt`.
  1. Make the `job.sh` file executable by running `chmod +x job.sh` and then run it to update the mongoDB databases.

## Deploying to Heroku
1. Create new Heroku crons for each of frontend and backend of app.
1. Set the Heroku environment variables accordingly. I used a Heroku buildpack [Multi Procfile buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile). To use the same, set the Procfiles in the proper locations and set the required buildpack variables accordingly.
1. Push to Heroku.
1. Add `https://yourapp.herokuapp.com/callback` as a Redirect URI in the settings of your Spotify application.


## License
MIT


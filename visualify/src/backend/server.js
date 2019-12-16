require('dotenv').config()
let express = require('express')
let request = require('request')
let querystring = require('querystring')
// let fs = require('fs')

console.log(process.env.SPOTIFY_CLIENT_ID,process.env.SPOTIFY_CLIENT_SECRET)
let app = express()

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {

  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      port:'80',
      //proxy:'https://172.16.2.30:8080',
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  console.log(authOptions)
  request.post(authOptions, function(error, response, body) {
    if (!error){
      console.log(body)
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
      res.redirect(uri + '?access_token=' + access_token)
    }
    else
      throw error;
    
  })
})

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)
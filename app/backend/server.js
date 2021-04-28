
require('dotenv').config()
var express = require('express') 
var request = require('request')
var path = require('path')
var cors = require('cors')
var mongoclient = require('mongodb').MongoClient
var history = require('connect-history-api-fallback')

var app=express()
app.set('json spaces',2)
const port = process.env.PORT || 3001
let address = process.env.MONGODB_HOST || "mongodb://localhost:27017/"
app.use(cors())
    // .use(express.static(path.join(__dirname,"../frontend/build")))
    // .use(
    //     history({
    //         verbose: true,
    //         rewrites: [
    //             { from: /\/login/, to: '/login' },
    //             { from: /\/callback/, to: '/callback' },
    //             { from: /\/refresh_token/, to: '/refresh_token' },
    //             { from: /\/request/, to: '/request' } 
    //         ]
    //     })
    // )




// app.get('*', function(req, res) {
//     res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
//   });


// app.get('/', function (req, res) {
// res.render(path.resolve(__dirname, '../frontend/build/index.html'));
// });


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });

app.get('/request',(req,res) => {
    mongoclient.connect(address, (err,client) => {
        if (err) throw err
        var messageData =[]
        var db = client.db("visualify")
        var topPlaylists = db.collection("myCollection")
        var viralPlaylists = db.collection("viralCollections")
        var radarPlaylists = db.collection("radarCollections")

        let task1 = new Promise((resolve,reject) => {
            topPlaylists.find().toArray((err,result) => {
            if (err) return reject(err);
            return resolve({'topPlaylists' : result });
            });
        });

        let task2 = new Promise((resolve,reject) => {
            viralPlaylists.find().toArray((err,result) => {
            if (err) return reject(err);
            return resolve({'viralPlaylists' : result });
            });
        })

        let task3 = new Promise((resolve,reject) => {
            radarPlaylists.find().toArray((err,result) => {
            if (err) return reject(err);
            return resolve({'radarPlaylists' : result });
            });
        })

        Promise.all([task1,task2,task3])
            .then(taskEntries => {
                taskEntries.forEach(task => {
                    messageData.push(task);
                })
                return messageData;
            })
            .then(messageData => res.send(JSON.stringify(messageData)));
    })
})

app.get('/login',(req,res) => {
    let redirect_uri = process.env.AUTH_URL
    console.log(redirect_uri)
    res.redirect(redirect_uri)
})

// app.get('/refresh_token', (req,res) => {
//     console.log('wt')
//     var refresh_token = req.query.refresh_token
//     const authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         headers: {
//             Authorization: `Basic ${new Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
//               'base64',
//             )}`
//           },
//         form: {
//             grant_type: 'refresh_token',
//             refresh_token
//         },
//         json: true
//     }
// })

module.exports = app
console.log(`Listening on port ${port}`)
app.listen(port)


require('dotenv').config()
var express = require('express') 
var path = require('path')
var cors = require('cors')
var request = require('request')
var mongoclient = require('mongodb').MongoClient

var app=express()
app.set('json spaces',2)
let port = process.env.PORT || 3001
let address = process.env.MONGODB_HOST || "mongodb://localhost:27017/"
app.use(cors())
app.use(express.static(path.join(__dirname,"src")))

app.all('/request', function(req, res, next) {
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

        topPlaylists.find().toArray((err,result) => {
            if (err) throw err
            messageData.push({'topPlaylists' : result})
            viralPlaylists.find().toArray((err,result2) => {
                if (err) throw err
                messageData.push({'viralPlaylists' : result2})
                res.send(JSON.stringify(messageData))
            })
        })
    })
})

app.get('/login',(req,res) => {
    let redirect_uri = process.env.AUTH_URL
    console.log(redirect_uri)
    res.redirect(redirect_uri)
})

module.exports = app
console.log(`Listening on port ${port}`)
app.listen(port)

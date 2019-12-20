const request = require('request')
const fetch = require('node-fetch')

var countries = [
    {country:"Algeria",country_code:"DZ"},
    {country:"Egypt",country_code:"EG"},
    {country:"Morocco",country_code:"MA"},
    {country:"Tunisia",country_code:"TN"},

    {country:"Bahrain",country_code:"BH"},
    {country:"Jordan",country_code:"JO"},
    {country:"Kuwait",country_code:"KW"},
    {country:"Lebanon",country_code:"LB"},
    {country:"Oman",country_code:"OM"},
    {country:"Palestine",country_code:"PS"},
    {country:"Qatar",country_code:"QA"},
    {country:"Saudi Arabia",country_code:"SA"},
    {country:"UAE",country_code:"AE"},

    {country:"Andorra",country_code:"AD"},
    {country:"Cyprus",country_code:"CY"},
    {country:"Luxembourg",country_code:"LU"},
    {country:"Monaco",country_code:"MC"},
]



var user_id = "spotifycharts";
var url = "https://api.spotify.com/v1/users/"+user_id+"/playlists";

// request({
//     url:playlist_url,
//     limit:50,
//     headers:{
//         "Authorization":process.env.SPOTIFY_CLIENT_ID + " "+ process.env.SPOTIFY_CLIENT_SECRET
//     },function(err,response) {
//         if(response){
//             var body = JSON.parse(res.body)
//             var playlists = body.items
//             console.log(playlists)
//         }
//         else{
//             console.log(err)
//         }
//     }
// })

export function utility(access_token){
    fetch(url, {
        method:'GET',
        headers:{"Authorization": "Bearer "+access_token}
    })
    .then((response) => {
        var body = JSON.parse(response.body)
        var playlists = body.items;
        console.log(playlists)
    })
    .catch(err => console.log(err))
};











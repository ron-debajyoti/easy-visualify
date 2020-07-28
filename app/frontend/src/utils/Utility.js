require('dotenv').config()
const fetch = require('node-fetch')

var url = process.env.BACKEND_URL
export const fetchData = () => 
    fetch(url, {
        method: 'GET'
    })
    .then(response => JSON.parse(response))
    .then( data => console.log(data))
    .catch( err => console.log(err))

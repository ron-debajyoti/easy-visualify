require('dotenv').config()
const fetch = require('node-fetch')

var url = process.env.BACKEND_URL || "https://easy-visualify-backend.herokuapp.com/request/"
export const fetchData = () => 
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .catch( err => console.log(err))

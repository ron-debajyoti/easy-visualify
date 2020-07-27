
const fetch = require('node-fetch')

var url = process.env.BACKEND_URL || 'https://localhost:3001'

export const fetchData = () => 
    fetch(`${url}`, {
        method: 'GET'
    })
    //.then(response => response.json())
    .then(data => data.items)
    .catch( err => console.log(err))

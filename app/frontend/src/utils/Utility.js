
const fetch = require('node-fetch')

var url = process.env.BACKEND_URL || "https://localhost:3001/request"
export const fetchData = () => 
    fetch(`${url}`, {
        method: 'GET'
    })
    .then(response => response.text())
    //.then(data => data.head)
    .catch( err => console.log(err))

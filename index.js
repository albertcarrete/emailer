const express = require('express');
const app = express();

// app - express app to register this route handler with
// get - request handler, watch for incoming requests with this method
// '/' watch for requests trying to access '/'
// req -- object representing the incoming request
// res -- object representing the outgoing response
// res.send({hi:'there}) -- immediately send some JSON back to who ever made this request
app.get('/', (req,res) => {
    res.send({hi: 'there'});
})

// check if we are in a development environment
// check for Heroku's port
const PORT = process.env.PORT || 5000;
// Express here is really just telling 
// Node.js to watch for traffic on this port
app.listen(PORT);
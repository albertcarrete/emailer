const express = require('express');
require('./services/passport');
const app = express();
require('./routes/authRoutes')(app);
// check if we are in a development environment
// check for Heroku's port
const PORT = process.env.PORT || 5000;
// Express here is really just telling
// Node.js to watch for traffic on this port
app.listen(PORT);

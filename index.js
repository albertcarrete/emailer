const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

// check if we are in a development environment
// check for Heroku's port
const PORT = process.env.PORT || 5000;
// Express here is really just telling
// Node.js to watch for traffic on this port
app.listen(PORT);

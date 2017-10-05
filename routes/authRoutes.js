const passport = require('passport');
module.exports = (app) => {
  // Route handler to kick off passport
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback/', passport.authenticate('google'));
};

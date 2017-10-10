const passport = require('passport');
module.exports = app => {
  // Route handler to kick off passport
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback/', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // req.logout is a function already attached
    // to the req object by Passport
    // this function kills the cookie
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};

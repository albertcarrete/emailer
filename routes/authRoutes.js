const passport = require('passport');
module.exports = app => {
  // Route handler to kick off passport
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  // third arg is where the request will get passed to
  // after the user successfully logins through Google
  app.get(
    '/auth/google/callback/', 
    passport.authenticate('google'),
    (req,res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    // req.logout is a function already attached
    // to the req object by Passport
    // this function kills the cookie
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};

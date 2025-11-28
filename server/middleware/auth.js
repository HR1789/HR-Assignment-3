// server/middleware/auth.js

module.exports.isAuthenticated = (req, res, next) => {
  // Extra safety check in case req.isAuthenticated is undefined
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // IMPORTANT: login route is /auth/login
  return res.redirect('/auth/login');
};

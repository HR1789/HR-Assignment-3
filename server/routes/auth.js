// server/routes/auth.js

const express = require('express');
const router = express.Router();
const passport = require('passport');

// ------------------------
// Login page
// ------------------------
router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login' });
});

// ------------------------
// Logout
// ------------------------
router.get('/logout', (req, res) => {
  // Passport 0.6+ requires callback form
  req.logout(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});

// ------------------------
// Google OAuth
// ------------------------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/applications');
  }
);

// ------------------------
// GitHub OAuth
// ------------------------
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/applications');
  }
);

module.exports = router;

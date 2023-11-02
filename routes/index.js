const express = require('express');
const router = express.Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res, next) {
res.render('index.ejs');
  
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { 
    scope: ['profile', 'email'], 
    prompt: "select_account"
  }
));

console.log('oauth2callback is next----------')

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/practices', 
    failureRedirect : '/'
  }
  ));
  console.log('oauth2callback has been called----------')

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destorys the cookie keeping track of the user!
    res.redirect('/') // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  })
})

module.exports = router;

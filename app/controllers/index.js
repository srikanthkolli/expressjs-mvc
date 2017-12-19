var dbconn = require('../../config/dbconn');
var passport = require('passport');
var passportStrategy = require('passport-local').Strategy;

exports.default = function(req, res) {
  res.render('index', { authenticated: true, title: 'Hey', message: 'Hello there!'});
};

exports.login = function(req, res) {
  res.render('login', { authenticated: false });
};

// exports.authenticate = function(req, res) {
//   passport.authenticate('local', { failureRedirect: '/login' })
// };


exports.signup = function(req, res) {
  res.render('login', { authenticated: false });
};
var express = require('express');
var session = require('express-session');
var path = require('path');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Q = require('q');
var userModel = require('../app/models/users');
var config = require('./');


module.exports = function (app) {
	// view engine setup
	app.set('views', path.join(config.root, 'app/views'));
	app.set('view engine', 'pug');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(config.root, 'public')));

	/* Passport initialization */
	passport.use(new Strategy(
	  function(email, password, cb) {
		Q.all(userModel.getByEmail(email)).done(function(result){
		  if(result['row'].length == 0 ) { return cb(null, false); }
		  if (result["row"][0]["password"] != password) { return cb(null, false); }
		  return cb(null, result["row"][0]);
		});
	}));

	// Configure Passport authenticated session persistence.
	passport.serializeUser(function(user, cb) {
	  //user id will be stored in req.session.user
	  cb(null, user.id);
	});

	passport.deserializeUser(function(id, cb) {
	 //using user id from serializeUser we will retrive user info
	 // from DB and store it in req.user
	  Q.all(userModel.get(id)).done(function(result){
	  	console.log(id);
	    if (result["row"].length == 0) { return cb(err); }
	    cb(null, result["row"][0]);
	  });
	});

	app.use(session({ secret: 'anything' }));
	app.use(passport.initialize());
  	app.use(passport.session());

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  console.log("inside error");
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});
}
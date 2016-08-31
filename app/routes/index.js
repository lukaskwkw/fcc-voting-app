'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('index-routes');

var path = process.cwd();
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var signup = require('../controllers/signupHandler.server.js');
var auth = require('../controllers/authHandler.server.js');
var userStats = require('../controllers/userStatHandler.server.js');
var passport = require('passport');

module.exports = function (app) {
	app.route('/').
	get(function (req, res) {
		res.sendFile(path + '/public/index4.html');
	});

	// app.route('/api/clicks').
	// get(clickHandler.getClicks).
	// post(clickHandler.addClick).
	// delete(clickHandler.resetClicks);

	app.route('/api/signup')
		.post(signup);

	app.route('/api/auth')
		.post(auth);

	app.route('/api/userStats')
		.get(passport.authenticate('jwt', {session: false}), userStats);

};


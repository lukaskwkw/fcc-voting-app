'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('index-routes');

var path = process.cwd();
var signup = require('../controllers/signupHandler.server.js');
var auth = require('../controllers/authHandler.server.js');
var middlewareAuth = require('../controllers/middlewareAuth.server.js');
var PollController = require('../controllers/pollHandler.server.js');

var express = require('express');


module.exports = function (app) {


	var router = express.Router();

	router.route('/signup')
		.post(signup)
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	router.route('/auth')
		.post(auth);


	router.use(middlewareAuth);

	router.route('/polls')
		.get(PollController.getPolls);

	router.route('/addPoll')
		.post(PollController.addPoll);

	router.route('/userStats')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html')
		});

	app.use('/api', router)

};

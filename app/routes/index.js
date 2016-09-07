'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('index-routes');

var path = process.cwd();
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var signup = require('../controllers/signupHandler.server.js');
var auth = require('../controllers/authHandler.server.js');
var middlewareAuth = require('../controllers/middlewareAuth.server.js');
// var passport = require('passport');

var express = require('express');

var Poll = require('../models/poll.js');

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
		.get(function (req, res) {
			Poll.getPolls(function (err, polls) {
				if (err) return res.send({
					success: false,
					msg: 'Database error'
				});

				return res.json({
					authencitated: req.decoded !== false,
					polls
				});

			})
		});
	// router.post('/poll')
	router.route('/addPoll')
		.post(function (req, res) {

			if (!req.decoded) {
				return res.status(401).send({
					success: false,
					msg: 'Unauthenticated'
				})
			}

			if (!req.body.pollData) {
				return res.send({
					success: false,
					msg: 'Please pass pollData'
				})
			}

			Poll.addPoll(req.body.pollData, (err, doc) => {
				if (err) return res.send({
					success: false,
					msg: 'Database error'
				});

				return res.send({
					success: true,
					msg: 'Poll ' + doc.question + ' saved successfully'
				})
			})

		});

	router.route('/userStats')
		.get(function (req, res) {
			res.sendFile(path + '/public/index4.html')
		});


	// router.route('/userStats')
	// 	.get(passport.authenticate('jwt', {session: false}), userStats);


	app.use('/api', router)

};

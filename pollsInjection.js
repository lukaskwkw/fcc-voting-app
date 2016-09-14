require('dotenv').config();

var mongoose = require('mongoose');
var Poll = require('./app/models/poll.js');
var PollData = require('./app/tests/fixtures/dataForPollSpec.js')
var log4js = require('log4js');
var logger = log4js.getLogger('db-injection');

var DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI);

// To-Do: Convert these ones to Promises by e.g. promisify from Bluebird or change models to promises

Poll.addPoll(PollData[0], (err, doc) => {
	if (err) throw err;
	logger.info('Document has been successfully inserted to the mongo db')
	Poll.addPoll(PollData[1], (err, doc) => {
		if (err) throw err;
		logger.info('Document has been successfully inserted to the mongo db')
		Poll.addPoll(PollData[2], (err, doc) => {
			if (err) throw err;
			logger.info('Document has been successfully inserted to the mongo db')
		});
	});
});

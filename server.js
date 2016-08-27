'use strict';

require('dotenv').config();

var log4js = require('log4js');
var logger = log4js.getLogger('server');

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;
var app = express();

var DB_USER, DB_PASS, DB_NAME;

[DB_USER, DB_PASS, DB_NAME] = [process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME]

logger.debug('Database properties', DB_USER, DB_PASS, DB_NAME)
// console.log(DB_USER, DB_PASS, DB_NAME);

mongo.connect('mongodb://' + DB_USER + ':' + DB_PASS + '@ds037005.mlab.com:37005/' + DB_NAME, function (err, db) {

	if (err) {
		throw new Error('Database failed to connect!');
	} else {
		logger.debug('MongoDB successfully connected on port 27017.');
	}

	app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
	app.use('/public', express.static(process.cwd() + '/public'));

	routes(app, db);

	var port = 3000;
	app.listen(port, function () {
		logger.debug('Node.js listening on port ' + port + '...');
	});

});


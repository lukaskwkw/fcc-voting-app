'use strict';

require('dotenv').config();

var log4js = require('log4js');
var logger = log4js.getLogger('server');
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./app/routes/index.js');
var app = express();
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var path = process.cwd();
var port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var DB_URI = process.env.DB_URI;

if (require.main === module)
	mongoose.connect(DB_URI);
else {
	//for testing purposes
	port = 5000;
	mockgoose(mongoose).then(function (err) {
		mongoose.connect(DB_URI);
	})
}

logger.info(DB_URI)

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(path + '/public/index.html');
})

routes(app);

app.listen(port, function () {
	logger.debug('Node.js listening on port ' + port + '...');
});

//for testing purposes
module.exports = app;

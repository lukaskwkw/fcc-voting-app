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


var DB_USER, DB_PASS, DB_NAME;

[DB_USER, DB_PASS, DB_NAME] = [process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME]

if (require.main === module)
	mongoose.connect('mongodb://' + DB_USER + ':' + DB_PASS + '@ds037005.mlab.com:37005/' + DB_NAME);
else {
	port = 5000;
	mockgoose(mongoose).then(function (err) {
		mongoose.connect('mongodb://' + DB_USER + ':' + DB_PASS + '@ds037005.mlab.com:37005/' + DB_NAME);
	})
}

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(path + '/public/index.html');
})

routes(app);

app.listen(port, function () {
	logger.debug('Node.js listening on port ' + port + '...');
});

module.exports = app;

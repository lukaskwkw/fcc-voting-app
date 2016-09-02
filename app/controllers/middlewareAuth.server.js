var User = require('../models/User.js');
var jwt = require('jwt-simple');

var log4js = require('log4js');
var logger = log4js.getLogger('user-stat');


function getToken (headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		}

		return null;
	}

	return null;
}

var middlewareAuth = function (req, res, next) {
	var token = getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, process.env.secret);
		User.findByEmail(decoded.email, function (doc) {
			if (!doc) {
				return res.status(403).send({
					success: false,
					msg: 'Authentication failed. User not found.'
				});
			}

			req.decoded = decoded;

			return next()

		}, function (err) {
			if (err) {
				return logger.error(err);
			}
		})
	}
	else {

		// logger.info('cokolwiek');
		req.decoded = false;

		// res.status(403).send({
		// 		success: false,
		// 		msg: 'No token provided.'
			// })
		return next();
	}
}

module.exports = middlewareAuth;

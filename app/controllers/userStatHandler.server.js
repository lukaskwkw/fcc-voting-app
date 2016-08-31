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

var userStat = function (req, res) {
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
			res.json({
				success: true,
				msg: 'You have authencitated successfully'
			})
		}, function (err) {
			if (err) {
				return logger.error(err);
			}
		})
	}
}

module.exports = userStat;

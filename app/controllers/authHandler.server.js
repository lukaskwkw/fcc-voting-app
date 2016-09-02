var User = require('../models/User.js');
var jwt = require('jwt-simple');


var auth = function (req, res) {
			if (!req.body.email || !req.body.password) {
				return res.json({
					success: false,
					msg: 'Please pass email and password.'
				});
			}

			User.login(req.body.email, req.body.password, function (err, doc) {
				if (err) {

					return res.json({
						success: false,
						msg: err.errmsg
					});
				}
				// logger.info('ERROR:', err, 'DOC:', doc);
				var dataToEncode = {
					email: doc.email,
					password: doc.encryptedPassword
				}

				var token = jwt.encode(dataToEncode, process.env.secret);

				return res.json({
					token: 'JWT ' + token,
					success: true,
					msg: 'Successful logged'
				});
			})
		}


module.exports = auth;

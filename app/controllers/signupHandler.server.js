var User = require('../models/User.js');


var signup = function (req, res) {
	if (!req.body.email || !req.body.password) {
		return res.json({
			success: false,
			msg: 'Please pass email and password.'
		});
	}
	// logger.info(req.body.email, req.body.password);
	User.register(req.body.email, req.body.password)
		.then((doc) => {
			return res.json({
				success: true,
				msg: 'Successful created new user ' + doc.email
			});
		})
		.catch((err) => {

			return res.json({
				success: false,
				msg: err.errmsg
			});
		})


}

module.exports = signup;

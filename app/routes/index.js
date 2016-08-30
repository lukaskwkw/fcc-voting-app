'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('index-routes');

var path = process.cwd();
// var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require('../models/User.js');


module.exports = function (app) {

	// var clickHandler = new ClickHandler(db);
	app.route('/').
	get(function (req, res) {
		res.sendFile(path + '/public/index4.html');
	});

	// app.route('/api/clicks').
	// get(clickHandler.getClicks).
	// post(clickHandler.addClick).
	// delete(clickHandler.resetClicks);

	app.route('/api/signup').
	post(function (req, res) {
		if (!req.body.email || !req.body.password) {
			return res.json({
				success: false,
				msg: 'Please pass email and password.'
			});
		} else {
			// logger.info(req.body.email, req.body.password);
			User.register(req.body.email, req.body.password, function (err, doc) {
				if (err) {

					return res.json({
						success: false,
						msg: err.errmsg
					});
				}
				// logger.info('ERROR:', err, 'DOC:', doc);

				res.json({
					success: true,
					msg: 'Successful created new user ' + doc.email
				});
			})

		}
	})

};

/**

{
	total: Int,
	categories : [
		{
			Health: String,
			Polls : [
						{
							PollName: String,
							patronId: "id" // albo dac obiekt
								{ pollData:
									{ answers :
										[ item1 : { text : string, nbOfVotes : Integer },
										 item2 : similar ]
									}
								}
						},

						{
							PollName: String,
							patronId: "id" // albo dac obiekt
								{ pollData:
									{ answers :
										[ item1 : { text : string, nbOfVotes : Integer },
										 item2 : similar ]
									}
								}
						},

						{
							PollName: String,
							patronId: "id" // albo dac obiekt
								{ pollData:
									{ answers :
										[ item1 : { text : string, nbOfVotes : Integer },
										 item2 : similar ]
									}
								}
						}

				  ]
		},
		{
			Finance: String,
			Polls : [
						{
							PollName: String,
							patronId: "id" // albo dac obiekt
								{ pollData:
									{ answers :
										[ item1 : { text : string, nbOfVotes : Integer },
										 item2 : similar ]
									}
								}
						}

				  ]
		},
		{
			Spiritual: String,
			Polls : [
						{
							PollName: String,
							patronId: "id" // albo dac obiekt
								{ pollData:
									{ answers :
										[ item1 : { text : string, nbOfVotes : Integer },
										 item2 : similar ]
									}
								}
						}

				  ]
		},
	]
}

*/

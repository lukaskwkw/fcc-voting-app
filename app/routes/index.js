'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require('../models/User.js');


module.exports = function (app, db) {

	var clickHandler = new ClickHandler(db);
	app.route('/').
	get(function (req, res) {
		res.sendFile(path + '/public/index4.html');
	});

	app.route('/api/clicks').
	get(clickHandler.getClicks).
	post(clickHandler.addClick).
	delete(clickHandler.resetClicks);

	app.route('/signup').
	post(function (req, res) {
		if (!req.body.name || !req.body.password) {
			return res.json({
				success: false,
				msg: 'Please pass name and password.'
			});
		} else {

			User.register(req.body.email, req.body.password, function (err) {
				if (err) {
					return res.json({
						success: false,
						msg: err.errmsg
					});
				}

				return res.json({
					success: true,
					msg: 'Successful created new user.'
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

'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {

var clickHandler = new ClickHandler(db);
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index4.html');
		});

	app.route('/api/clicks')
		.get(clickHandler.getClicks)
		.post(clickHandler.addClick)
		.delete(clickHandler.resetClicks);
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

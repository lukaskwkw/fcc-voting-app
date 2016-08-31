var Schema = require('mongoose').Schema;

var voteSchema = new Schema({userId: String});
var choiceSchema = new Schema({
	text: String,
	votes: [voteSchema]
})

var PollSchema = new Schema({
	category: String,
	question: String,
	choices: [choiceSchema]
})

module.exports = PollSchema;

/*

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

var Schema = require('mongoose').Schema;


var pollSchema = new Schema({
	total: Number,
	categories: [{
		categoryName: String,
		Polls: [{
			pollName: String,
			pollData: {
				answers: [{
					answerText: String,
					nbOfVotes: Number
				}]
			}
			// patronId: Schema.Tyoes.ObjectId
		}]
	}]
})


module.exports = pollSchema;

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

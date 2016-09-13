var Schema = require('mongoose').Schema;

var voteSchema = new Schema({userId: String});

var choiceSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	votes: [voteSchema]
})

var PollSchema = new Schema({
	category: {
		type: String,
		required: true
	},
	question: {
		type: String,
		required: true
	},
	choices: [choiceSchema]
})

module.exports = PollSchema;

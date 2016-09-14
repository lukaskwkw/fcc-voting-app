var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var PollSchema = require('./fixtures/schemas/pollSchema.js');

var log4js = require('log4js');
var logger = log4js.getLogger('Poll');

var Poll = (function () {

	var _model = mongoose.model('polls', PollSchema);

	function getPolls () {
		return _model.find({}, {})
			.exec();
	}

	function addPoll (data) {
		var model = new _model({
			category: data.category,
			question: data.question,
			choices: data.choices
		});

		return model.save();
	}

	function deletePoll (id) {
		return _model
			.find({_id: id})
			.remove()
			.exec();

	}

	return {
		getPolls,
		addPoll,
		deletePoll,
		model: _model
	}

})();

module.exports = Poll;

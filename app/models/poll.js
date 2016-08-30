var mongoose = require('mongoose');
var pollSchema = require('./fixtures/schemas/pollSchema.js');

var Poll = (function () {

  var _model = mongoose.model('polls', pollSchema);

	function _getPolls () {

	}

	function _addPoll () {

	}

	function _deletePoll () {

	}

	function _updatePoll () {

	}

	return {
		getPolls: _getPolls,
		addPoll: _addPoll,
		deletePoll: _deletePoll,
		updatePoll: _updatePoll
	}

})();

module.exports = Poll;

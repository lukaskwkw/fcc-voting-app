var mongoose = require('mongoose');
var PollSchema = require('./fixtures/schemas/pollSchema.js');

var log4js = require('log4js');
var logger = log4js.getLogger('Poll');

var Poll = (function () {

  var _model = mongoose.model('polls', PollSchema);

	function _getPolls (cb) {
		_model.find({}, {}, (err, polls) => {
			if (err) {
				logger.error(err)

				return cb(err, null);
			}

			if (!polls) {
				var noPolls = new Error('No polls returned');
				logger.error(noPolls);

				return cb(noPolls, null);
			}

			// logger.info(polls);

			return cb(null, polls);
		})
	}

	function _addPoll (data, cb) {
		var model = new _model({
			category: data.category,
			question: data.question,
			choices: data.choices
		});

		model.save(function (err, doc) {
			if (err) {
				logger.error(err);

				return cb(err, null);
			}

			// logger.info('everything OK');

			return cb(null, doc);
		})
	}

	function _deletePoll (id, cb) {
		_model.find({_id: id}).remove(function (err, doc) {
			if (err) {
				logger.warn(err);

				return cb(err, null);
			}

			return cb(null, doc);
		})
		.exec();

	}

	return {
		getPolls: _getPolls,
		addPoll: _addPoll,
		deletePoll: _deletePoll,
		model: _model
	}

})();

module.exports = Poll;

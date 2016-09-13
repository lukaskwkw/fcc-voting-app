var Poll = require('../models/poll.js');


function addPoll (req, res) {

	if (!req.decoded) {
		return res.status(401).send({
			success: false,
			msg: 'Unauthenticated'
		})
	}

	if (!req.body.pollData) {
		return res.send({
			success: false,
			msg: 'Please pass pollData'
		})
	}

	Poll.addPoll(req.body.pollData, (err, doc) => {
		if (err) return res.send({
			success: false,
			msg: err.message
		});

		return res.send({
			success: true,
			msg: 'Poll ' + doc.question + ' saved successfully'
		})
	})


}

function getPolls (req, res) {
	Poll.getPolls(function (err, polls) {
		if (err) return res.send({
			success: false,
			msg: err.message
		});

		return res.json({
			authencitated: req.decoded !== false,
			polls
		});

	})

}

module.exports = {
	addPoll,
	getPolls
};

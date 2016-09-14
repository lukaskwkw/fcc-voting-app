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

	Poll.addPoll(req.body.pollData)
		.then((doc) => {
			return res.send({
				success: true,
				msg: 'Poll ' + doc.question + ' saved successfully'
			})
		})
		.catch((err) => {
			return res.send({
				success: false,
				msg: err.message
			});
		})

}

function getPolls (req, res) {
	Poll.getPolls().then((polls) => {
			return res.json({
				authencitated: req.decoded !== false,
				polls
			});
		})
		.catch((err) => {
			return res.send({
				success: false,
				msg: err.message
			});
		})

}

module.exports = {
	addPoll,
	getPolls
};

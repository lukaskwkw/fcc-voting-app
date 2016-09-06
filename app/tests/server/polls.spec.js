const mongoose = require('mongoose');

var log4js = require('log4js');
var logger = log4js.getLogger('spec polls');

const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../../../server.js');

const should = chai.should();

const Poll = require('../../models/poll.js');
const User = require('../../models/User.js');

chai.use(chaiHttp);

describe('Polls', function () {

	var pollData = {
		question: 'Does more automation solve major human problems like hunger, poverty?',
		category: 'Live',
		choices: [{
			text: 'Yes it does',
			votes: []
		},
		{
			text: 'No because people will never use it for solving those problems',
			votes: []
		}]
	}

var token = null;

	before(function (done) {
		User.register('polls_maniek@gmail.com', 'polltestpolltest', function (err) {
			if (err) {
				throw err;
			}

			var user = {
				email: 'polls_maniek@gmail.com',
				password: 'polltestpolltest'
			}

			chai.request(server)
				.post('/api/auth')
				.send(user)
				.end((error, res) => {
					if (error) throw error;

					res.should.have.status(200);
					res.body.should.have.property('success').equal(true);
					res.body.should.have.property('token');
					token = res.body.token;
					done();
				})
	});
	})

	after(function (done) {
		User.model.remove({}, function () {
			done();
		})
	});

	it('given poll data when token is NOT provided then should return unauthicated message', function (done) {
		chai.request(server)
			.post('/api/addPoll')
			.send(pollData)
			.set('authorization', token)
			.end((err, res) => {
				if (err) logger.error(err);

				res.should.have.status(403);
				done();
			})
	});

	it('given poll data when token is provided then should add new poll to the mongo DB', function (done) {
		chai.request(server)
			.post('/api/addPoll')
			.send({pollData})
			.set('authorization', token)
			.end((err, res) => {
				if (err) logger.error(err);

				res.should.have.status(200);
				res.body.should.have.property('success').equal(true);
				done();
			});
	});

});
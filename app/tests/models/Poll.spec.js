require('dotenv').config();
var chai = require('chai');
require('mocha');
chai.should();

var assert = chai.assert;
var Poll = require('../../models/poll.js');

var log4js = require('log4js');
var logger = log4js.getLogger('Poll-spec');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var mockgoose = require('mockgoose');

var PollData = require('../fixtures/dataForPollSpec.js')

var DB_URI = process.env.DB_URI;

mockgoose(mongoose).then(function (err) {
	mongoose.connect(DB_URI);
})

var id = null;

describe('Poll', function () {

	before(function (done) {
		Poll.model.remove({}, function () {
			Poll.addPoll(PollData[1])
				.then((doc) => {
				id = doc._id
				Poll.addPoll(PollData[0])
					.then(() => done());
			});
		})
	});

	after(function (done) {
		Poll.model.remove({}, function () {
			done();
		})
	});

	//	This test have to be 1st (due to more Polls insertion after this one)
	it('given a call to the database when invoking getPolls function then should get all polls from db', function (done) {

		Poll.getPolls().then((polls) => {
			polls.length.should.equal(2);
			done();
		});
	});

	it('given poll data when invoking addPoll function then should add poll to the database', function (done) {

		Poll.addPoll(PollData[2]).then((doc) => {
			doc.should.have.property('question').equal('Do you run polls on your sites sidebar?');
			done();
		});

	});

	it('given poll with correct id when invoking remove function then shuld remove poll', function (done) {
		Poll.deletePoll(id).then((doc) => {
			doc.result.should.have.property('ok').equal(1);
			doc.result.should.have.property('n').equal(1);
			Poll.getPolls().then((polls) => {
				//	after prev test we had 4 now it's should be 2
				polls.length.should.equal(2);
				done();
			})
		})
	});

	it('given poll with incorrect id when invoking remove function then shuldn\'t do anything', function (done) {
		Poll.deletePoll('123452122311').then((doc) => {

			doc.result.should.have.property('ok').equal(1);
			doc.result.should.have.property('n').equal(0);

			Poll.getPolls().then((polls) => {
				//	after prev test (remove 1) we had 4 now it's should be 2
				polls.length.should.equal(2);
				done();
			})
		})

	});

});

require('dotenv').config();
var chai = require('chai');
require('mocha');
chai.should();
var assert = chai.assert;
var Poll = require('../../models/poll.js');

describe('Poll', function () {

	it('given poll data when invoking addPoll function then should add poll to the database', function (done) {
		addPoll()
	});

	before(function (done) {

	});

	after(function (done) {

	});

});

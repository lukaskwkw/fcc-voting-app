require('dotenv').config();
var chai = require('chai');
require('mocha');
chai.should();
var assert = chai.assert;

var log4js = require('log4js');
var logger = log4js.getLogger('spec');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var User = require('../../models/User.js');

var DB_URI = process.env.DB_URI;

//	in case where .env could change in a future

process.env.KEY = '$FAsx9!@5Az3#5_=_23dd';

mockgoose(mongoose).then(function (err) {
	mongoose.connect(DB_URI);
})

describe('Users', function () {
	before(function (done) {
		User.register('antek1@poczta.pl', 'mocnehasloantka').then(() => {
			done()
		})
	});

	after(function (done) {
		User.model.remove({}, function () {
			done();
		})
	});

	it('given email and password when calling register on User then should return registered doc', function (done) {
		User.register('tomek22@poczta.pl', 'tomekpass').then((doc) => {
			doc.email.should.equal('tomek22@poczta.pl');
			doc.encryptedPassword.should.not.equal('tomekpass');
			doc.encryptedPassword.should.equal('09fc933275b7b0b00b');
			done();
		});
	});

	it('given already registered user email when register then should pass error', function (done) {
		User.register('antek1@poczta.pl', 'haslo').catch((err) => {
			const DUPLICATE_KEY_ERROR = 11000;
			assert.equal(err.code, DUPLICATE_KEY_ERROR);
			done();
		});
	});

	it('given correct email and password when calling login on User then should find and return doc', function (done) {
		User.login('antek1@poczta.pl', 'mocnehasloantka').then((doc) => {
			assert.equal(doc.email, 'antek1@poczta.pl');
			assert.equal(doc.encryptedPassword, '10fc9d397bafb0b014eedbedc1d8d7');
			done()
		});
	});

	it('given correct email and incorrect password when calling login on User then should catch error', function (done) {
		User.login('antek1@poczta.pl', 'zlehaslo').catch((err) => {
			assert.equal(err.errmsg, 'Password mismatching');
			done()
		});
	});

	it('given incorrect email when calling login on User then should catch error', function (done) {
		User.login('zlyEmail@poczta.pl', 'niewazne').catch((err) => {
			assert.equal(err.errmsg, 'user ' + 'zlyEmail@poczta.pl' + ' not found');
			done()
		});
	});

});

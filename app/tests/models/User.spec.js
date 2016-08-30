require('dotenv').config();
var chai = require('chai');
require('mocha');
chai.should();
var assert = chai.assert;

var log4js = require('log4js');
var logger = log4js.getLogger('spec');
var mongoose = require('mongoose');
var User = require('../../models/User.js');

var DB_USER, DB_PASS, DB_NAME;

[DB_USER, DB_PASS, DB_NAME] = [process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME];

//	in case of change in future
process.env.KEY = '$FAsx9!@5Az3#5_=_23dd';

mongoose.connect('mongodb://' + DB_USER + ':' + DB_PASS + '@ds037005.mlab.com:37005/' + DB_NAME);

describe('Users', function () {
	before(function (done) {
		User.register('antek1@poczta.pl', 'mocnehasloantka', function () {
			done()
		})
	});

	after(function (done) {
		User.model.remove({}, function () {
			done();
		})
	});

	it('given email and password when calling register on User then should return registered doc', function (done) {
		User.register('tomek22@poczta.pl', 'tomekpass', function (doc) {
			doc.email.should.equal('tomek22@poczta.pl');

			// thanks to decryption getter set on userSchema
			doc.password.should.not.equal('09fc933275b7b0b00b');
			doc.password.should.equal('tomekpass');
			done();
		});
	});

	it('given already registered user email when register then should pass error', function (done) {
		User.register('antek1@poczta.pl', 'haslo', function (err) {
			// logger.info(JSON.stringify(err));
			const DUPLICATE_KEY_ERROR = 11000;
			assert.equal(err.code, DUPLICATE_KEY_ERROR);
			done();
		});
	});

	it('given correct email and password when calling login on User then should find and return doc', function (done) {
		User.login('antek1@poczta.pl', 'mocnehasloantka', function (doc) {
			// logger.info(doc);
			assert.equal(doc.email, 'antek1@poczta.pl');
			assert.equal(doc.password, 'mocnehasloantka');
			done()
		});
	});

	it('given correct email and incorrect password when calling login on User then should pass undefined', function (done) {
		User.login('antek1@poczta.pl', 'zlehaslo', function (doc) {
			// logger.info(doc);
			assert.isUndefined(doc);
			done()
		});
	});

	it('given incorrect email when calling login on User then should pass undefined', function (done) {
		User.login('antek1@poczta2.pl', 'zlehaslo', function (doc) {
			// logger.info(doc);
			assert.isUndefined(doc);
			done()
		});
	});

});

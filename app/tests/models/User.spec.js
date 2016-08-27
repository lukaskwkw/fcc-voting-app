require('dotenv').config();
var mocha = require('mocha');
var mongoose = require('mongoose');
var User = require('../../models/User.js');
var should = require('should');

var DB_USER, DB_PASS, DB_NAME;

[DB_USER, DB_PASS, DB_NAME] = [process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME]

mongoose.connect('mongodb://' + DB_USER + ':' + DB_PASS + '@ds037005.mlab.com:37005/' + DB_NAME);

describe('Users', function() {
	beforeEach(function (done) {
		User.register('antek1@poczta.pl', 'mocnehasloantka', function (doc) {
			console.log('test', doc);
			done()
		})
	});

	// afterEach(function (done) {
	// 	User.model.remove({},function () {
	// 		done();
	// 	})
	// });

	it('regiester a new user', function(done) {
		User.register('tomek22@poczta.pl', 'tomekpass', function (doc) {
			doc.email.should.equal('tomek22@poczta.pl');
			doc.crypted_password.should.not.equal('tomekpass');
			done();
		});
	});
});
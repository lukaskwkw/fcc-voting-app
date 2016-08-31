'use strict';

const mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger('spec auth');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const should = chai.should();
const User = require('../../models/User.js');

chai.use(chaiHttp);

describe('Authenticate', function () {

	before(function (done) {
		User.register('tomekszybkanoga4@gmail.com', 'szklanebuty17', function (err) {
			if (err) {
				throw err;
			}

			done();
		})
	});

	after(function (done) {
		User.model.remove({}, function () {
			done();
		})
	});

	it('given login and password when sending to the server then should retrive a token for the session', function (done) {
		var user = {
			email: 'tomekszybkanoga4@gmail.com',
			password: 'szklanebuty17'
		}

		chai.request(server)
			.post('/api/auth')
			.send(user)
			.end((err, res) => {
				if (err) throw err;
				// logger.info(res);
				res.should.have.status(200);
				res.body.should.have.property('success').equal(true);
				res.body.should.have.property('token');
				// logger.info(res.body);
				done();
			})
	});
});

const mongoose = require('mongoose');
var log4js = require('log4js');
var logger = log4js.getLogger('spec');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const should = chai.should();
const User = require('../../models/User.js');

chai.use(chaiHttp);

describe('Signup', function () {

	before(function (done) {
		User.model.remove({}, function () {
			done();
		})
	});

	it('given signup route when posting data to the server then should create a user', function (done) {
		var user = {
			email: 'tomeczekszybki@poczta.pl',
			password: 'kozianoga5'
		}

		chai.request(server)
			.post('/api/signup')
			.send(user)
			.end((err, res) => {
				if (err) {
					throw err
				}
				// logger.info(JSON.stringify(res.body));
				res.should.have.status(200);
				res.body.should.have.property('success').eql(true);

				done();
			})
	});
});

'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var userSchema = require('./fixtures/schemas/userSchema.js');

var log4js = require('log4js');
var logger = log4js.getLogger('User');


var User = (function () {


  var _model = mongoose.model('users', userSchema);

  var _findByEmail = (email) => {
    return _model.findOne({email}).exec();
  }

  var _login = (email, password) => {
    return _findByEmail(email)
      .then((doc) => {
        var error = {};
        if (!doc) {
          error = {errmsg: 'user ' + email + ' not found'};
          logger.warn(error);

          return Promise.reject(error);
        }

        if (!doc.comparePasswords(doc.encryptedPassword, password)) {
          error = {errmsg: 'Password mismatching'};
          logger.warn(error);

          return Promise.reject(error);
        }

        return Promise.resolve(doc);
      })
  }

  var _register = (email, password) => {
    var user = new _model({
      email,
      encryptedPassword: password
    });

   return user.save();
  }

  return {
    schema: userSchema,
    model: _model,
    login: _login,
    register: _register,
    findByEmail: _findByEmail
  }

})();


module.exports = User;

'use strict';

var mongoose = require('mongoose');
var userSchema = require('./fixtures/schemas/userSchema.js');

var log4js = require('log4js');
var logger = log4js.getLogger('User');


var User = (function () {


  var _model = mongoose.model('users', userSchema);

  var _findByEmail = function (email, success, fail) {
    _model.findOne({email}, function (err, doc) {
      //  TO-DO delete !doc OR condition and handle empty doc in _login and _register function or something like that (maybe read mongoose doc)
      if (err || !doc) {
        fail(err);
      } else {
        success(doc)
      }
    })
  }

  var _login = function (email, password, callback) {
    _findByEmail(email, function (doc) {
      if (doc.password !== password) {
        logger.warn('Password mismatching ');

        return callback();
      }

      return callback(doc);
    }, function (err) {
      if (err) logger.error(err);

      logger.warn('user ' + email + ' not found');

      return callback();
    })
  }

  var _register = function (email, password, callback) {
    _findByEmail(email, function () {
      logger.warn('Email ' + email + ' already in use ');

      return callback();
    }, function (err) {
      if (err) logger.error(err);

      var user = new _model({
        email,
        password
      });

      user.save(function (error, doc) {
        if (error) throw error;

        logger.debug('User ' + doc.email + ' Saved Successfully');

        return callback(doc);
      })

    })
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

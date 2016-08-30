'use strict';

var mongoose = require('mongoose');
var userSchema = require('./fixtures/schemas/userSchema.js');

var log4js = require('log4js');
var logger = log4js.getLogger('User');


var User = (function () {


  var _model = mongoose.model('users', userSchema);

  var _findByEmail = function (email, success, fail) {
    _model.findOne({email}, function (err, doc) {
      logger.info('error', err);

      if (err) {
        fail(err);
      } else {
        success(doc)
      }
    })
  }

  var _login = function (email, password, callback) {
    _findByEmail(email, function (doc) {
      if (doc === null) {
        logger.warn('user ' + email + ' not found');

        return callback();
      }

      if (doc.password !== password) {
        logger.warn('Password mismatching ');

        return callback();
      }

      return callback(doc);
    }, function (err) {
      if (err) logger.error(err);

      return callback(err);
    })
  }

  var _register = function (email, password, callback) {
    _findByEmail(email, function (doc) {

      if (doc) {
        logger.warn('Email ' + email + ' already in use ');

        return callback();
      }

        var user = new _model({
          email,
          password
        });

        user.save(function (error, document) {
          if (error) throw error;

          logger.debug('User ' + document.email + ' Saved Successfully');

          return callback(document);
        })

    }, function (err) {
      if (err) logger.error(err);

      return callback(err);
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

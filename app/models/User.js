var log4js = require('log4js');
var logger = log4js.getLogger('User');

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var User = (function () {
  var userSchema = new Schema({
    id: Number,
    email: {
      type: String,
      index: {
        unique: true,
        required: true
      }
    },
    polls: [{
      type: Schema.ObjectId,
      ref: 'poll'
    }],
    crypted_password: String,
    auth_token: String
  })

  var _model = mongoose.model('users', userSchema);

  var _findByEmail = function (email, success, fail) {
    _model.findOne({email}, function (err, doc) {
      if (err || !doc) {
        fail(err);
      } else {
        success(doc)
      }
    })
  }

  var _login = function (email, password, callback) {
    _findByEmail(email, function (doc) {
      logger.debug('User found the user data Doc : ', doc);

      return callback(doc);
    }, function (err) {
      logger.debug(err);
    })
  }

  var _register = function (email, password, callback) {
    _findByEmail(email, function () {
      throw new Error('Email ' + email + ' already in use ')
    }, function () {

      var user = new _model({
        email,
        crypted_password: password
      });

      user.save(function (err, doc) {
        if (err) throw err;

        logger.debug('User Saved Successfully');

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

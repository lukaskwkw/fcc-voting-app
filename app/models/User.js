var User = (function() {

  var mongoose = require('mongoose');
  var Schema = require('mongoose').Schema;
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

  var _findByEmail = function(email, success, fail) {
    _model.findOne({
      email: email
    }, function(e, doc) {
      if (e || !doc) {
        fail(e);
      } else {
        success(doc)
      }
    })
  }

  var _login = function(email, password, callback) {
    _findByEmail(email, function(doc) {
      callback(doc);
      console.log("User found the user data Doc : ", doc);
    }, function(err) {
      console.log(err);
    })
  }

  var _register = function(email, password, callback) {
    _findByEmail(email, function(doc) {
      throw new Error('Email ' + email + ' already in use ')
    }, function() {

      user = new _model({
        email : email,
        crypted_password : password
      });

      user.save(function(err, doc) {
        if (err) throw err;

        callback(doc);
        console.log('User Saved Successfully');
      })

    })
  }

  return {
    schema : userSchema,    
    model : _model,  
    login: _login,
    register: _register,
    findByEmail: _findByEmail
  }

})();


module.exports = User;
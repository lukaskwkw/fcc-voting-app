var Schema = require('mongoose').Schema;

var encryption = require('../encryption.js');

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
  password: String,
  auth_token: String
})

userSchema.methods.encrypt = encryption.encrypt;
userSchema.methods.comparePasswords = encryption.comparePasswords;

userSchema.path('password').set(function (value) {
  return this.encrypt(value);
});

module.exports = userSchema;

var log4js = require('log4js');
var logger = log4js.getLogger('passport');

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
// load up the user model
var User = require('../app/models/User.js');
require('dotenv').config()

var secret = process.env.secret

module.exports = function (passport) {
  var opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = secret;
  logger.debug('opts configured');

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findByEmail(jwt_payload.email, function (user) {
      // logger.info(jwt_payload);
      if (user) {
        logger.debug(user)
        done(null, user);
      } else {
        logger.debug('else')
        done(null, false);
        // or you could create a new account
      }
    }, function (err) {
      if (err) {
        logger.debug('err')

        return done(err, false);
      }
    });
  }));
};

var crypto = require('crypto');

var algorithm = 'aes-256-ctr'

if (!process.env.KEY) {
	throw new Error('Encryption Key is missing!');
}

function encrypt (passwordToEncryption) {
  var cipher = crypto.createCipher(algorithm, process.env.KEY)
  var crypted = cipher.update(passwordToEncryption, 'utf8', 'hex')
  crypted += cipher.final('hex');

  return crypted;
}

function decrypt (passwordToEncryption) {
  var decipher = crypto.createDecipher(algorithm, process.env.KEY)
  var dec = decipher.update(passwordToEncryption, 'hex', 'utf8')
  dec += decipher.final('utf8');

  return dec;
}

module.exports = {
	encrypt,
	decrypt
};

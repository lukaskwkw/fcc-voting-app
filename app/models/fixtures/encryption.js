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

function comparePasswords (encryptedPassword, passwordToCompare) {
  var cipher = crypto.createCipher(algorithm, process.env.KEY)
  var newCrypted = cipher.update(passwordToCompare, 'utf8', 'hex')
  newCrypted += cipher.final('hex');

  if (encryptedPassword === newCrypted)
    return true;

  return false;
}

module.exports = {
	encrypt,
	comparePasswords
};

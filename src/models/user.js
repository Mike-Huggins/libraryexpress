const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

userSchema.pre('save', function encryptPassword(next) {
  if (!this.isModified('password')) {
    // document.isModified is a built-in method that tells you if the value of a field has changed since the last save
    next();
  } else {
    bcrypt.hash(this.password, 10, (error, hash) => { // this line hashes the password asynchronously. The callback has a `hash` parameter, which is the encrypted password
      if (error) {
        next(error); // passing an argument into next() will cause the save to fail
      } else {
        this.password = hash; // we update the password value on the document to be the encrypted password. When the save happens, the encrypted value will now be saved instead.
        return next(); // moves to the next piece of middleware or code
      };
    });
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

const User = require('../models/user');

exports.addUser = (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.save().then(() => {
    res.status(201).json(newUser.sanitise());
  }).catch((error) => {
    if (error.errors.email.message === 'invalid email address') {
    // is there an email error? if so emailError is the error.errors.email.message, otherwise it is null
      const emailError = error.errors.email ? error.errors.email.message : null;
      res.status(400).json({
        errors: {
          email: emailError,
        },
      });
    } else {
      res.sendStatus(500);
    }
  });
};

exports.helloWorld = (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
};

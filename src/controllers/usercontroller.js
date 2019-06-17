const User = require('../models/user');

exports.addUser = (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(newUser);
  newUser.save().then(() => {
    res.status(201).send(newUser);
  }).catch(e => res.send(e));
};

exports.helloWorld = (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
};

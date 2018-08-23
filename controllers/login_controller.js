const LoginModel = require('../models/login_model');

const { errorMessages } = require('../config.json');

module.exports = {
  login,
};

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({message: errorMessages['BAD_REQUEST'], data: null, err: 'BAD_REQUEST'});
  }
  LoginModel.authenticate(username, password)
  .then(response => {
    return res.send({message: response.message, data: null, err: null});
  })
  .catch(err => {
    console.log('Error in login', err);
    return res.status(401).send({message: err.message, data: null, err: err.errCode});
  });
}
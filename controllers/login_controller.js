const jwt = require('jsonwebtoken');

const LoginModel = require('../models/login_model');
const { errorMessages, jwtSecret } = require('../config.json');

module.exports = {
  login,
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @description Controller for Login API. Gets username and password from client and verifies it.
 * @returns
 * Success - 200 OK with updated todo list
 * Failure - 401 Unauthorized in case of login failure
 */
function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({message: errorMessages['BAD_REQUEST'], data: null, err: 'BAD_REQUEST'});
  }
  LoginModel.authenticate(username, password)
  .then(response => {
    const token = jwt.sign({user: username}, jwtSecret, {
      expiresIn : 60*60*24 // expires in a day
    });
    return res.send({message: response.message, data: token, err: null});
  })
  .catch(err => {
    console.log('Error in login', err);
    return res.status(401).send({message: err.message, data: null, err: err.errCode});
  });
}
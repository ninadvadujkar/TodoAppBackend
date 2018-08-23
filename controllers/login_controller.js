const LoginModel = require('../models/login_model');

const { errorMessages } = require('../config.json');

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
 * Failure - 503 Service Unavailable in case of backend error
 */
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
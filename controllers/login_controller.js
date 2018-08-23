const LoginModel = require('../models/login_model');

module.exports = {
  login,
};

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({message: 'Bad request. Username or password missing'});
  }
  LoginModel.authenticate(username, password)
  .then(response => {
    return res.send(response);
  })
  .catch(err => {
    console.log('Error in login', err);
    return res.status(401).send({message: 'Login failed', err});
  });
}
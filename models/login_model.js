const { userDetails } = require('../mock_database/dbdata.json');
const { errorMessages } = require('../config.json');

function LoginModel() {}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns
 * Success - Object with succcess message
 * Error - Object with error message and errCode
 */
LoginModel.authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simulate delay similar to a call to Database
    setTimeout(() => {
      console.log('login', userDetails, username, password);
      if (username === userDetails.username && password === userDetails.password) {
        resolve({message: 'Login Successful'});
      } else {
        console.log('login failed');
        reject({message: errorMessages['LOGIN_ERR'], errCode: 'LOGIN_ERR'});
      }
    }, 500);
  });
};

module.exports = LoginModel;
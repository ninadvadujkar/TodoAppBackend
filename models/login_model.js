const { userDetails } = require('../mock_database/dbdata.json');

function LoginModel() {}

LoginModel.authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simulate delay similar to a call to Database
    setTimeout(() => {
      console.log('login', userDetails, username, password);
      if (username === userDetails.username && password === userDetails.password) {
        resolve({message: 'Login Successful'});
      } else {
        console.log('login failed');
        reject(new Error('Login Failed'));
      }
    }, 1000);
  });
};

module.exports = LoginModel;
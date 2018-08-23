const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { errorMessages, jwtSecret } = require('./config.json');
const login = require('./routes/login');
const todo = require('./routes/todo');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Add CORS Headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// define routes
app.use('/api/login', login);
// Auth middleware
app.use((req, res, next) => {
  if (req.method !== "OPTIONS") {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      // verify the token
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).send({message: errorMessages['TOKEN_VERIFICATION_ERR'], data: null, err: 'TOKEN_VERIFICATION_ERR'});
        }
        // if we're here it means that token is valid
        req.decodedToken = decodedToken;
        next();
      });
    } else {
      // If we're here it means user has not provided a token
      return res.status(403).send({message: errorMessages['TOKEN_MISSING_ERR'], err: 'TOKEN_MISSING_ERR'});
    }  
  } else {
    next();
  }
});
app.use('/api/todo', todo);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({message: 'Resource not found!'});
});

module.exports = app;

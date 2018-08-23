const fs = require('fs');

const { errorMessages } = require('../config.json');

const todoDBPath = './mock_database/todo_data.json';

function TodoModel() {}

TodoModel.getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(todoDBPath, 'utf-8', (err, resp) => {
      if (err) {
        reject({message: errorMessages['FETCH_ERR'], errCode: "FETCH_ERR"});
      }
      try {
        resolve({todos: JSON.parse(resp).todos});
      } catch(e) {
        reject({message: errorMessages['JSON_PARSE_ERR'], errCode: "JSON_PARSE_ERR"});
      }
    });
  });
};

TodoModel.delete = () => {

};

TodoModel.create = () => {

};

module.exports = TodoModel;
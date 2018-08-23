const fs = require('fs');

const { errorMessages } = require('../config.json');

const todoDBPath = './mock_database/todo_data.json';
const jsonParseErr = { message: errorMessages['JSON_PARSE_ERR'], errCode: "JSON_PARSE_ERR" };

function readDBData() {
  return new Promise((resolve, reject) => {
    fs.readFile(todoDBPath, 'utf-8', (err, resp) => {
      if (err) {
        return reject({message: errorMessages['FETCH_ERR'], errCode: "FETCH_ERR"});
      }
      try {
        return resolve({todos: JSON.parse(resp).todos});
      } catch(e) {
        return reject(jsonParseErr);
      }
    });
  });
}

function writeToDB(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(todoDBPath, JSON.stringify(data), (err, resp) => {
      if (err) {
        return reject({message: errorMessages['WRITE_ERR'], errCode: "WRITE_ERR"});
      }
      return resolve(true);
    });
  });
}

function TodoModel() {}

TodoModel.getAll = () => {
  return new Promise((resolve, reject) => {
    readDBData()
    .then(todos => {
      resolve(todos);
    })
    .catch(err => {
      reject(err);
    });
  });
};

TodoModel.del = id => {
  return new Promise((resolve, reject) => {
    readDBData()
    .then(todos => {
      try {
        if (!todos.todos[id]) return reject({message: errorMessages['NOT_FOUND'], errCode: "NOT_FOUND"});
        delete todos.todos[id];
        writeToDB(todos)
        .then(response => {
          resolve(todos);
        })
        .catch(err => {
          reject(err);
        }); 
      } catch (e) {
        console.log(e);
        reject(jsonParseErr);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
};

TodoModel.create = (newTodo) => {
  return new Promise((resolve, reject) => {
    readDBData()
    .then(todos => {
      try {
        todos.todos[newTodo.id] = newTodo;
        writeToDB(todos)
        .then(response => {
          resolve(todos);
        })
        .catch(err => {
          reject(err);
        }); 
      } catch (e) {
        console.log(e);
        reject(jsonParseErr);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
};

module.exports = TodoModel;
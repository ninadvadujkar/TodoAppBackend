const fs = require('fs');

const { errorMessages } = require('../config.json');

const todoDBPath = './mock_database/todo_data.json';
const jsonParseErr = { message: errorMessages['JSON_PARSE_ERR'], errCode: "JSON_PARSE_ERR" };

/**
 * @description Reads to data from db file. Returns a promise
 * @returns
 * Success - Object with todo list
 * Failure - Error message with errCode
 */
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

/**
 * 
 * @param {Object} data
 * @description  Writes data to db file. Returns a promise
 * @returns
 * Success - Boolean true
 * Failure - Error message with errCode
 */
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

/**
 * @description Model to get all todos
 */
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

/**
 * 
 * @param {string} id 
 * @description Model to delete a todo based on id supplied
 */
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

/**
 * 
 * @param {Object} newTodo 
 * @description Model to add/create a new todo
 */
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
const uuidv1 = require('uuid/v1');

const { getAll, create } = require('../models/todo_model');

const { errorMessages } = require('../config.json');

module.exports = {
  getAllTodos,
  deleteTodo,
  createTodo,
};

function getAllTodos(req, res) {
  getAll()
  .then(response => {
    const todos = Object.values(response.todos);
    return res.send({message: 'Got todos', data: todos, err: null});
  })
  .catch(err => {
    return res.status(503).send({message: err.message, data: null, err: err.errCode});
  });
}

function deleteTodo(req, res) {
  res.send({});
}

function createTodo(req, res) {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send({message: errorMessages['BAD_REQUEST'], data: null, err: 'BAD_REQUEST'});
  }
  create({message, id: uuidv1()})
  .then(response => {
    const todos = Object.values(response.todos);
    return res.send({message: 'Added todo', data: todos, err: null});
  })
  .catch(err => {
    return res.status(503).send({message: err.message, data: null, err: err.errCode});
  });
}
const { getAll } = require('../models/todo_model');


module.exports = {
  getAllTodos,
  deleteTodo,
  createTodo,
};

function getAllTodos(req, res) {
  getAll()
  .then(response => {
    const todos = Object.values(response.todos);
    res.send({message: 'Got todos', data: todos, err: null});
  })
  .catch(err => {
    res.status(503).send({message: err.message, data: null, err: err.errCode});
  });
}

function deleteTodo(req, res) {
  res.send({});
}

function createTodo(req, res) {
  res.send({});
}
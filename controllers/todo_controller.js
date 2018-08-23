const uuidv1 = require('uuid/v1');

const { getAll, create, del } = require('../models/todo_model');

const { errorMessages } = require('../config.json');

module.exports = {
  getAllTodos,
  deleteTodo,
  createTodo,
};

/**
 * 
 * @param {Object} req 
 * @param {Object} res
 * @description Controller for GET /api/todo.
 * Success - 200 OK with todo list
 * Failure - 503 Service Unavailable in case of backend error
 */
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

/**
 * 
 * @param {Object} req 
 * @param {Object} res
 * @description Controller for DELETE /api/todo/:id.
 * @returns 
 * Success - 200 OK with updated todo list
 * Failure - 503 Service Unavailable in case of backend error
 *       - 404 Not Found when todo not found
 */
function deleteTodo(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({message: errorMessages['BAD_REQUEST'], data: null, err: 'BAD_REQUEST'});
  }
  del(id)
  .then(response => {
    const todos = Object.values(response.todos);
    return res.send({message: `Deleted todo ${id}`, data: todos, err: null});
  })
  .catch(err => {
    if (err.errCode === 'NOT_FOUND') res.status(404);
    else res.status(503);
    return res.send({message: err.message, data: null, err: err.errCode});
  });
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @description Controller for POST /api/todo.
 * @returns
 * Success - 200 OK with updated todo list
 * Failure - 503 Service Unavailable in case of backend error
 */
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
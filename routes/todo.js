const express = require('express');
const router = express.Router();

const { getAllTodos, createTodo, deleteTodo } = require('../controllers/todo_controller');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
module.exports = router;
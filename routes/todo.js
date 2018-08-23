const express = require('express');
const router = express.Router();

const { getAllTodos, createTodo } = require('../controllers/todo_controller');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.delete('/:id', (req, res) => res.send({message: 'OK'}));
module.exports = router;
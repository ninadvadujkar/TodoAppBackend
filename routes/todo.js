const express = require('express');
const router = express.Router();

const { getAllTodos } = require('../controllers/todo_controller');

router.get('/', getAllTodos);
router.delete('/:id', (req, res) => res.send({message: 'OK'}));
router.post('/', (req, res) => res.send({message: 'OK'}));
module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send({message: 'OK'}));
router.delete('/:id', (req, res) => res.send({message: 'OK'}));
router.post('/', (req, res) => res.send({message: 'OK'}));
module.exports = router;
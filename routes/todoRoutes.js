const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//Listele
router.get('/', todoController.getTodos);

//Oluştur
router.post('/', todoController.addTodo);

//Güncelle
router.put('/:id', todoController.updateTodo);

//Sil
router.delete('/:id', todoController.deleteTodo);

//Tamamla
router.put('/complete/:id', todoController.completeTodo);

module.exports = router;

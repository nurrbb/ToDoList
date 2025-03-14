// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Tüm todo'ları getir
router.get('/', todoController.getAllTodos);

// Belirli bir todo'yu id ile getir
router.get('/:id', todoController.getTodoById);

// Yeni bir todo oluştur
router.post('/', todoController.createTodo);

// Varolan bir todo'yu güncelle
router.put('/:id', todoController.updateTodo);

// Todo sil
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

// controllers/todoController.js
const Todo = require('../models/Todo');

// Tüm todo'ları döndür
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.getAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Todo list alınırken hata oluştu.' });
    }
};

// Belirli id'li todo'yu döndür
exports.getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.getById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo bulunamadı.' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Todo alınırken hata oluştu.' });
    }
};

// Yeni todo oluştur
exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Başlık gerekli.' });
        }
        const newTodo = await Todo.create({ title, description });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Todo oluşturulurken hata oluştu.' });
    }
};

// Todo güncelle
exports.updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, completed } = req.body;
        const updatedTodo = await Todo.update(id, { title, description, completed });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo bulunamadı.' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Todo güncellenirken hata oluştu.' });
    }
};

// Todo sil
exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Todo.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Todo bulunamadı.' });
        }
        res.json({ message: 'Todo başarıyla silindi.' });
    } catch (error) {
        res.status(500).json({ error: 'Todo silinirken hata oluştu.' });
    }
};

const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db/db.json");

const readTodos = (callback) => {
    fs.readFile(dbPath, "utf8", (err, data) => {
        if (err) return callback(err, null);
        let todos = [];
        try {
            todos = JSON.parse(data);
            if (!Array.isArray(todos)) {
                todos = [];
            }
        } catch (e) {
            todos = [];
        }
        callback(null, todos);
    });
};

const writeTodos = (todos, callback) => {
    fs.writeFile(dbPath, JSON.stringify(todos, null, 2), callback);
};

exports.getTodos = (req, res) => {
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        res.render("index", { todos });
    });
};

exports.addTodo = (req, res) => {
    const { title, description } = req.body;
    if (!title && !description) {
        return res.status(400).json({ error: "Başlık veya Açıklama boş olamaz!" });
    }
    const newTodo = {
        id: Date.now().toString(),
        title: title || "Başlık Yok",
        description: description || "Açıklama Yok",
        completed: false,
        deleted: false
    };
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        todos.push(newTodo);
        writeTodos(todos, (err) => {
            if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
            res.redirect("/");
        });
    });
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].deleted = true;
            writeTodos(todos, (err) => {
                if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
                res.redirect("/");
            });
        } else {
            res.status(404).json({ error: "Görev bulunamadı" });
        }
    });
};

exports.completeTodo = (req, res) => {
    const { id } = req.params;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].completed = true;
            writeTodos(todos, (err) => {
                if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
                res.redirect("/");
            });
        } else {
            res.status(404).json({ error: "Görev bulunamadı" });
        }
    });
};

exports.restoreTodo = (req, res) => {
    const { id } = req.params;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].deleted = false;
            writeTodos(todos, (err) => {
                if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
                res.redirect("/");
            });
        } else {
            res.status(404).json({ error: "Görev bulunamadı" });
        }
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].title = title || todos[index].title;
            todos[index].description = description || todos[index].description;
            writeTodos(todos, (err) => {
                if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
                res.redirect("/");
            });
        } else {
            res.status(404).json({ error: "Görev bulunamadı" });
        }
    });
};

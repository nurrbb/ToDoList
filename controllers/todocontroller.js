const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db/db.json"); // JSON veritabanı dosyasının yolu

// JSON dosyasını okuma fonksiyonu
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

// JSON dosyasına yazma fonksiyonu
const writeTodos = (todos, callback) => {
    fs.writeFile(dbPath, JSON.stringify(todos, null, 2), callback);
};

// Tüm görevleri getiren fonksiyon
exports.getTodos = (req, res) => {
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });
        res.render("index", { todos }); // HTML şablonuna görevleri gönder
    });
};

// Yeni görev ekleyen fonksiyon
exports.addTodo = (req, res) => {
    const { title, description } = req.body;
    if (!title && !description) {
        return res.status(400).json({ error: "Başlık veya Açıklama boş olamaz!" });
    }

    // Yeni görev nesnesi oluşturuluyor
    const newTodo = {
        id: Date.now().toString(), // Benzersiz bir ID oluştur
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
            res.redirect("/"); // Görev eklendikten sonra anasayfaya yönlendir
        });
    });
};

// Görevi silme işlemi (soft delete)
exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });

        // Silinecek görevi bul
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].deleted = true; // Silindi olarak işaretle
            writeTodos(todos, (err) => {
                if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
                res.redirect("/");
            });
        } else {
            res.status(404).json({ error: "Görev bulunamadı" });
        }
    });
};

// Görevi tamamlandı olarak işaretleme
exports.completeTodo = (req, res) => {
    const { id } = req.params;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });

        // Tamamlanacak görevi bul
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

// Silinen bir görevi geri yükleme
exports.restoreTodo = (req, res) => {
    const { id } = req.params;
    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });

        // Geri yüklenecek görevi bul
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos[index].deleted = false; // Silinme durumunu kaldır
            writeTodos(todos, (err) => {
                if (err) return res.status(500).json({ error: "Dosya yazma hatası" });
                res.redirect("/");
            });
        } else {
            res.status(404).json({ error: "Görev bulunamadı" });
        }
    });
};

// Mevcut bir görevi güncelleme
exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    readTodos((err, todos) => {
        if (err) return res.status(500).json({ error: "Dosya okuma hatası" });

        // Güncellenecek görevi bul
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

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

// Veritabanı bağlantısını oluştur
const adapter = new FileSync('db/db.json');
const db = low(adapter);

// Varsayılan değerleri ayarla (ilk çalıştırmada gereklidir)
db.defaults({ todos: [] }).write();

class Todo {
    // Tüm todo'ları getir
    static getAll() {
        return db.get('todos').value();
    }

    // Id’ye göre todo getir
    static getById(id) {
        return db.get('todos').find({ id }).value();
    }

    // Yeni todo oluştur
    static create(data) {
        const newTodo = {
            id: uuidv4(),
            title: data.title,
            description: data.description || '',
            completed: false,
            createdAt: new Date().toISOString()
        };
        db.get('todos').push(newTodo).write();
        return newTodo;
    }

    // Todo güncelle
    static update(id, data) {
        const todo = db.get('todos').find({ id }).value();
        if (!todo) {
            return null;
        }
        const updatedTodo = { ...todo, ...data, updatedAt: new Date().toISOString() };
        db.get('todos').find({ id }).assign(updatedTodo).write();
        return updatedTodo;
    }

    // Todo sil
    static delete(id) {
        const todo = db.get('todos').find({ id }).value();
        if (!todo) {
            return null;
        }
        db.get('todos').remove({ id }).write();
        return true;
    }
}

module.exports = Todo;

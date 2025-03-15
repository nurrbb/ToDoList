const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

// JSON tabanlı veritabanı adaptörü oluşturuluyor
const adapter = new FileSync('db/db.json');
const db = low(adapter);

// Varsayılan veritabanı yapısı belirleniyor
db.defaults({ todos: [] }).write();

class Todo {
    // Tüm görevleri getirir
    static getAll() {
        return db.get('todos').value();
    }

    // Belirli bir ID'ye sahip görevi getirir
    static getById(id) {
        return db.get('todos').find({ id }).value();
    }

    // Yeni bir görev oluşturur
    static create(data) {
        const newTodo = {
            id: uuidv4(), // Benzersiz ID oluşturuluyor
            title: data.title, // Başlık zorunlu
            description: data.description || '', // Açıklama opsiyonel
            completed: false, // Yeni eklenen görevler varsayılan olarak tamamlanmamış olacak
            createdAt: new Date().toISOString() // Oluşturulma zamanı ekleniyor
        };
        db.get('todos').push(newTodo).write(); // Görev veritabanına ekleniyor
        return newTodo;
    }

    // Varolan bir görevi günceller
    static update(id, data) {
        const todo = db.get('todos').find({ id }).value();
        if (!todo) {
            return null; // Eğer görev bulunamazsa null döndür
        }
        const updatedTodo = {
            ...todo,
            ...data, // Yeni gelen verileri mevcut görev ile birleştir
            updatedAt: new Date().toISOString() // Güncellenme zamanını kaydet
        };
        db.get('todos').find({ id }).assign(updatedTodo).write(); // Değişiklikleri kaydet
        return updatedTodo;
    }

    // Bir görevi siler
    static delete(id) {
        const todo = db.get('todos').find({ id }).value();
        if (!todo) {
            return null; // Eğer görev yoksa null döndür
        }
        db.get('todos').remove({ id }).write(); // Görevi listeden kaldır
        return true; // Başarıyla silindiğini belirt
    }
}

module.exports = Todo;

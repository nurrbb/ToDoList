const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { v4: uuidv4 } = require('uuid');

const adapter = new FileSync('db/db.json');
const db = low(adapter);

db.defaults({ todos: [] }).write();

class Todo {
    static getAll() {
        return db.get('todos').value();
    }

    static getById(id) {
        return db.get('todos').find({ id }).value();
    }

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

    static update(id, data) {
        const todo = db.get('todos').find({ id }).value();
        if (!todo) {
            return null;
        }
        const updatedTodo = { ...todo, ...data, updatedAt: new Date().toISOString() };
        db.get('todos').find({ id }).assign(updatedTodo).write();
        return updatedTodo;
    }

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

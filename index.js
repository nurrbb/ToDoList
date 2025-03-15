const express = require("express");
const app = express();
const path = require("path");
const todoController = require("./controllers/todoController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", todoController.getTodos);
app.post("/todos/add", todoController.addTodo);
app.get("/todos/:id/delete", todoController.deleteTodo);
app.get("/todos/:id/complete", todoController.completeTodo);
app.get("/todos/:id/restore", todoController.restoreTodo);
app.post("/todos/:id/update", todoController.updateTodo);

app.listen(4444, () => {
    console.log("Sunucu 4444 portunda çalışıyor.");
});

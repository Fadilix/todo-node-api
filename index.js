const express = require("express");
const cors = require("cors");

const app = express();

// for accessing the environment variables
require("dotenv").config();
const { env } = process;

// use express.json

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// instance of the database connection
const db = require("./models");

// using the controllers
const userController = require("./controllers/userController")
const todosController = require("./controllers/todoController")


// ------------- different routes --------------- //
// ------------- user routes -------------------- //
// welcome page
app.get("/", (req, res) => {
    return res.json({ message: "Hello world!!!" });
})

// add a user to the database
app.post("/api/users/signup", userController.addUser);

// log a user in
app.post("/api/users/login", userController.logUserIn);

// delete a user
app.delete("/api/users/:userId", userController.deleteUser);


// edit a userr
app.put("/api/users/edit", userController.editUser);

// get all the users
app.get("/api/users", userController.getAllUsers);

// get a user by id
app.get("/api/users/:userId", userController.getUserById);



// ------------- todo routes -------------------- //
// get all todos
app.get("/api/todos", todosController.getAllTodos);

// add a todo
app.post("/api/todos", todosController.addTodo);

// numbers of todos
app.get("/api/todos/num", todosController.getNumberOfTodos);

// delete a task
app.delete("/api/todos/:id", todosController.deleteTodo);



// running the server
const PORT = env.PORT;
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}...`);
    })
})
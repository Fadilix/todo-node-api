const { Todo } = require("../models");

const getAllTodos = async (req, res) => {
    const todos = await Todo.findAll();

    return res.status(200).json({ todos });

}

const addTodo = async (req, res) => {

    try {
        const { task, description } = req.body;

        const todo = await Todo.create({ task, description });

        return res.status(201).json({ newTask: todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server error" });
    }

}


module.exports = {
    getAllTodos,
    addTodo
}
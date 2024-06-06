const { Todo } = require("../models");


// get all the todos
const getAllTodos = async (req, res) => {
    const todos = await Todo.findAll();

    return res.status(200).json({ todos });

}


// add a todo
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


// get The number of todos
const getNumberOfTodos = async (req, res) => {
    try {
        const numberOfTodos = await Todo.count();
        return res.status(200).json({ count: numberOfTodos });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

// delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        // Using findOne to find a single record by ID
        const todo = await Todo.findOne({ where: { id } });

        if (todo) {
            // Using destroy to delete the record
            await Todo.destroy({ where: { id } });

            return res.status(200).json({
                message: "Task deleted successfully!",
                deletedTask: todo
            });
        } else {
            return res.status(404).json({ message: "Task not found" });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

module.exports = {
    getAllTodos,
    addTodo,
    getNumberOfTodos,
    deleteTodo
}

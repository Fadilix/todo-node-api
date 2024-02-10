const { User } = require("../models");

// creating a new user
const addUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // creating a new user object
        const newUser = await User.create({ username, password });

        res.status(201).json({
            user: newUser,
            message: "User created successfully."
        });
    } catch (error) {
        console.error("Error creating user", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// log user in
const logUserIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Using Sequelize's findOne method to find a user by username
        const existingUser = await User.findOne({
            where: {
                username,
            },
        });

        if (existingUser) {
            // Check if the provided password matches the user's password
            const isPasswordValid = await existingUser.comparePassword(password);

            if (isPasswordValid) {
                res.status(200).json({ message: "User logged in successfully" });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        } else {
            res.status(404).json({ message: "User not found. Please register first." });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// delete user
const deleteUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = User.create({ username, password });

        if (existingUser) {
            User.deleteOne({ where: { username: existingUser, password } })
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// edit user
const editUser = async (req, res) => {
    try {
        const { oldUsername, newUsername, newPassword } = req.body;

        // Find the user in the database by the old username
        const existingUser = await User.findOne({
            where: {
                username: oldUsername,
            },
        });

        if (existingUser) {
            // Update the user's username and/or password
            if (newUsername) {
                existingUser.username = newUsername;
            }

            if (newPassword) {
                existingUser.password = newPassword;
            }

            // Save the updated user data to the database
            await existingUser.save();

            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error editing user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// get all users 
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json({ users: allUsers, result: true });
    } catch (error) {
        console.error('Error getting all users');
        res.status(500).json({ message: "Internal server error", result: false })
    }
}

// get a user by id
const getUserById = async (req, res) => {
    try {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            res.status(200).json({ user: user });
        } catch (error) {
            res.status(404).json({ message: "User not found", result: false });
        }

    } catch (error) {
        console.error('Error getting user');
        res.status(500).json({ message: "Internal server error", result: false });
    }
}

module.exports = {
    addUser,
    logUserIn,
    deleteUser,
    editUser,
    getAllUsers,
    getUserById
}
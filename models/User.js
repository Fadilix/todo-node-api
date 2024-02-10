// Creating the User object
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                notEmpty: true,
            }
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Todo, { onDelte: "CASCADE" });
    }

    // Hash the password before saving it to the database
    User.beforeCreate(async (user) => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    });

    // Method to compare the provided password with the stored hashed password
    User.prototype.comparePassword = async function (userPassword) {
        return await bcrypt.compare(userPassword, this.password);
    };

    return User;
}
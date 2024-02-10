// creating the Todo object
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define("Todo", {
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    })

    Todo.associate = (models) => {
        Todo.belongsTo(models.User);
    }
    return Todo;
}
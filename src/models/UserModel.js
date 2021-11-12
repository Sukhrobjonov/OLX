module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("users", {
        user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        user_name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        user_email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        user_password: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },

        user_role: {
            type: Sequelize.ENUM("admin", "user"),
            allowNull: false,
            defaultValue: "user",
        },
    });
};

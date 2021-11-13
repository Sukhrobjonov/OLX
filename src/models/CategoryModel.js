module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("categories", {
        category_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        category_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        category_photo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
};

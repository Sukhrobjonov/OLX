const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
});

module.exports = function postgres() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log("DATABASE ERROR:", error);
    }
};

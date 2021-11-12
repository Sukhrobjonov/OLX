const { Sequelize } = require("sequelize");
const AdsModel = require("../../models/AdsModel");
const CategoryModel = require("../../models/CategoryModel");
const SessionModel = require("../../models/SessionModel");
const UserModel = require("../../models/UserModel");
const relations = require("./relations");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
});

module.exports = async function postgres() {
    try {
        await sequelize.authenticate();

        const db = {};

        db.users = await UserModel(sequelize, Sequelize);
        db.sessions = await SessionModel(sequelize, Sequelize);
        db.categories = await CategoryModel(sequelize, Sequelize);
        db.ads = await AdsModel(sequelize, Sequelize);

        await relations(db);

        sequelize.sync({ force: false });

        return db;
    } catch (error) {
        console.log("DATABASE ERROR:", error);
    }
};

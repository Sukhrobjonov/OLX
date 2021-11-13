module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("ads", {
        ads_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ads_title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ads_phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ads_description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ads_slug: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ads_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        ads_photo: {
            type: Sequelize.STRING,
            defaultValue: "nophoto.png",
            allowNull: true,
        },
    });
};

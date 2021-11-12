const { genHash } = require("../bcrypt");
const { createToken } = require("../jwt");

module.exports = async (db) => {
    const count = await db.users.count();

    if (count === 0) {
        const user = await db.users.create({
            user_name: "admin",
            user_email: "admin@gmail.com",
            user_password: genHash("admin"),
            user_role: "admin",
        });

        // console.log(user);
    }
};

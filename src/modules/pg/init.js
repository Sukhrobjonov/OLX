const { genHash } = require("../bcrypt");
const { createToken } = require("../jwt");

module.exports = async (db) => {
    const count = await db.users.count();
    const countCategory = await db.categories.count();

    if (countCategory === 0) {
        const smcategory = await db.categories.create({
            category_name: "Smatfonlar",
            user_photo: "48857d9b505aef6c4bcc7871c39e5911.jpeg",
        });
        const smcategory = await db.categories.create({
            category_name: "Transportlar",
            user_photo: "7adfcc517bd72d04571d54ce95515fce.png",
        });
    }

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

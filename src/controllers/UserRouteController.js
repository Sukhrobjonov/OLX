const { genHash } = require("../modules/bcrypt");
const { SignUpValidation } = require("../modules/validations");

module.exports = class UserRouteController {
    static async UserRegistrationGetController(req, res) {
        try {
            res.render("registration");
        } catch (error) {
            console.log(error);
        }
    }

    static async UserLoginGetController(req, res) {
        try {
            res.render("login");
        } catch (error) {
            console.log(error);
        }
    }

    static async UserRegistrationPostController(req, res) {
        try {
            const { name, email, password } = await SignUpValidation(req.body);

            const user = await req.db.users.create({
                user_name: name,
                user_email: email,
                user_password: genHash(password),
            });

            console.log(user.dataValues);

            res.redirect("/login");
        } catch (error) {
            res.render("registration", {
                error,
            });
        }
    }
};

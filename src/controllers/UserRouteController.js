const { genHash, compareHash } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const { SignUpValidation, LoginValidation } = require("../modules/validations");

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

            res.redirect("/users/login");
        } catch (error) {
            if (error.message === "Validation error") {
                error = "Error: Bu email allaqachon ro'yxatdan o'tgan";
            }
            res.render("registration", {
                error,
            });
        }
    }

    static async UserLoginPostController(req, res) {
        try {
            const { email, password } = await LoginValidation(req.body);

            const user = await req.db.users.findOne({
                where: {
                    user_email: email,
                },
                raw: true,
            });

            if (!user) throw new Error("Foydalanuvchi topilmadi");

            const isTrust = compareHash(password, user.user_password);

            if (!isTrust) throw new Error("Parol noto'g'ri");

            await req.db.sessions.destroy({
                where: {
                    user_id: user.user_id,
                    session_useragent: req.headers["user-agent"] || "Unknown",
                },
            });

            const session = await req.db.sessions.create({
                user_id: user.user_id,
                session_useragent: req.headers["user-agent"] || "Unknown",
            });

            const token = createToken({
                session_id: session.dataValues.session_id,
                role: user.user_role,
            });

            res.cookie("token", token).redirect("/");
        } catch (error) {
            res.render("login", { error });
        }
    }

    static async UserLogoutGetController(req, res) {
        try {
            res.clearCookie("token").redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
};

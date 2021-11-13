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

            return res.redirect("/users/login");
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

    static async UserProfileGetController(req, res) {
        try {
            if (!req.user) {
                return res.redirect("/");
            }
            const user_id = req.params.user_id;

            const user = await req.db.users.findOne({
                where: {
                    user_id: user_id,
                },
                raw: true,
            });

            if (!user) {
                return res.redirect("/");
            }

            const user_ads = await req.db.ads.findAll({
                where: {
                    user_id: user_id,
                },
                raw: true,
            });

            const isOwnProfile = req.user.user_id === user.user_id;

            res.render("profile", {
                user: req.user,
                role: req.role,
                profile: user,
                isOwnProfile,
                user_ads,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async UserSessionsGetController(req, res) {
        try {
            const user_sessions = await req.db.sessions.findAll({
                where: {
                    user_id: req.user.user_id,
                },
                raw: true,
            });

            res.render("sessions", {
                user: req.user,
                role: req.role,
                user_sessions,
            });
        } catch (error) {}
    }

    static async UserSessionsDeleteController(req, res) {
        try {
            const session_id = req.params.session_id;

            if (!req.user) {
                return res.redirect("/");
            }

            await req.db.sessions.destroy({
                where: {
                    session_id: session_id,
                    user_id: req.user.user_id,
                },
            });

            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
};

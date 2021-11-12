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
            console.log(req.body);
            // const user = await User.create(req.body);
            // res.redirect("/login");
        } catch (error) {
            console.log(error);
        }
    }
};

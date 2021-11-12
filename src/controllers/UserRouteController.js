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
};

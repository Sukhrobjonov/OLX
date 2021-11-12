module.exports = class HomeRouteController {
    static async HomeGetController(req, res) {
        try {
            res.render("index", {
                user: req.user,
                role: req.role,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

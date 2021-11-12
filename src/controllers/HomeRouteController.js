module.exports = class HomeRouteController {
    static async HomeGetController(req, res) {
        try {
            res.render("index", {
                user: req.user,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

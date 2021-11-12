module.exports = class AdminRouteController {
    static async AdminGetController(req, res) {
        try {
            res.render("admin", {
                user: req.user,
                role: req.user,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

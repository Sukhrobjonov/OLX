module.exports = class HomeRouteController {
    static async HomeGetController(req, res) {
        try {
            res.render("index", {
                user: req.user,
                role: req.role,
                categories: await req.db.categories.findAll({ raw: true }),
            });
        } catch (error) {
            console.log(error);
        }
    }
};

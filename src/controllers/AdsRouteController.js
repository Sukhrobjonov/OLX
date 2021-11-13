module.exports = class AdsRouteController {
    static async AdsGetController(req, res) {
        try {
            res.render("add_ads", {
                user: req.user,
                role: req.role,
                categories: await req.db.categories.findAll({ raw: true }),
            });
        } catch (error) {
            console.log(error);
        }
    }
};

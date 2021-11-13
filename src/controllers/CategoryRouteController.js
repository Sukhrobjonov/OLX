module.exports = class CategoryRouteController {
    static async CategoryGetController(req, res) {
        try {
            const { category_id } = req.params;

            const category = await req.db.categories.findOne({
                where: {
                    category_id,
                },
                raw: true,
            });

            const category_ads = await req.db.ads.findOne({
                where: {
                    category_id,
                },
                raw: true,
            });
            res.render("category", {
                user: req.user,
                role: req.role,
                category_ads,
                category,
            });
        } catch (error) {
            console.log(error);
        }
    }
};

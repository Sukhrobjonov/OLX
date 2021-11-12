module.exports = class HomeRouteController {
    static async HomeRouteGetController(req, res) {
        try {
            res.render("index");
        } catch (error) {
            console.log(error);
        }
    }
};

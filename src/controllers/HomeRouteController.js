module.exports = class HomeRouteController {
    static async HomeGetController(req, res) {
        try {
            res.render("index");
        } catch (error) {
            console.log(error);
        }
    }
};

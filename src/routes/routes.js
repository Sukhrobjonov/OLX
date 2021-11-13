const AdminRoute = require("./AdminRoute");
const AdsRoute = require("./AdsRoute");
const CategoryRoute = require("./CategoryRoute");
const HomeRoute = require("./HomeRoute");
const UserRoute = require("./UserRoute");

module.exports = (app) => {
    try {
        app.use(HomeRoute.path, HomeRoute.router);
        app.use(UserRoute.path, UserRoute.router);
        app.use(AdminRoute.path, AdminRoute.router);
        app.use(AdsRoute.path, AdsRoute.router);
        app.use(CategoryRoute.path, CategoryRoute.router);
    } catch (error) {
        console.log(error);
    }
};

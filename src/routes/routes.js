const HomeRoute = require("./HomeRoute");
const UserRoute = require("./UserRoute");

module.exports = (app) => {
    try {
        app.use(HomeRoute.path, HomeRoute.router);
        app.use(UserRoute.path, UserRoute.router);
    } catch (error) {
        console.log(error);
    }
};

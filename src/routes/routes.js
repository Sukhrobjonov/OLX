const HomeRoute = require("./HomeRoute");

module.exports = (app) => {
    try {
        app.use(HomeRoute.path, HomeRoute.router);
    } catch (error) {
        console.log(error);
    }
};

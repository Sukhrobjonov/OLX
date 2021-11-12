const { HomeGetController } = require("../controllers/HomeRouteController");

const router = require("express").Router();

router.get("/", HomeRouteGetController);

module.exports = {
    path: "/",
    router,
};

const { HomeGetController } = require("../controllers/HomeRouteController");
const userMiddleware = require("../middlewares/userMiddleware");

const router = require("express").Router();

router.get("/", userMiddleware, HomeGetController);

module.exports = {
    path: "/",
    router,
};

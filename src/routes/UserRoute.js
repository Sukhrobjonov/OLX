const router = require("express").Router();

router.get("/registration", HomeRouteGetController);
router.get("/login", HomeRouteGetController);

module.exports = {
    path: "/users",
    router,
};

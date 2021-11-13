const router = require("express").Router();

router.get("/", HomeGetController);

module.exports = {
    path: "/ads",
    router,
};

const {
    CategoryGetController,
} = require("../controllers/CategoryRouteController");

const router = require("express").Router();

router.get("/:category_id", CategoryGetController);

module.exports = {
    path: "/category",
    router,
};

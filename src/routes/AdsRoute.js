const { AdsGetController } = require("../controllers/AdsRouteController");

const router = require("express").Router();

router.get("/add", AdsGetController);

module.exports = {
    path: "/ads",
    router,
};

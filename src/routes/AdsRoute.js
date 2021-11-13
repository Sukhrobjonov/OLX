const {
    AdsAddGetController,
    AdsAddPostController,
    AdsGetOneController,
    AdsDeleteController,
} = require("../controllers/AdsRouteController");
const fileUpload = require("express-fileupload");

const router = require("express").Router();

router.get("/add", AdsAddGetController);
router.post("/add", fileUpload(), AdsAddPostController);
router.get("/:slug", AdsGetOneController);
router.get("/delete/:ads_id", AdsDeleteController);

module.exports = {
    path: "/ads",
    router,
};

const {
    AdsAddGetController,
    AdsAddPostController,
    AdsGetOneController,
} = require("../controllers/AdsRouteController");
const fileUpload = require("express-fileupload");

const router = require("express").Router();

router.get("/add", AdsAddGetController);
router.post("/add", fileUpload(), AdsAddPostController);
router.get("/:slug", AdsGetOneController);

module.exports = {
    path: "/ads",
    router,
};

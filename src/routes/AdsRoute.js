const {
    AdsAddGetController,
    AdsAddPostController,
    AdsGetOneController,
    AdsDeleteController,
} = require("../controllers/AdsRouteController");
const fileUpload = require("express-fileupload");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/add", AdsAddGetController);
router.post("/add", [authMiddleware, fileUpload()], AdsAddPostController);
router.get("/:slug", AdsGetOneController);
router.get("/delete/:ads_id", authMiddleware, AdsDeleteController);

module.exports = {
    path: "/ads",
    router,
};

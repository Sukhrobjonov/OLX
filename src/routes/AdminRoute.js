const {
    AdminGetController,
    CreateCategoryPostController,
    DeleteCategoryController,
} = require("../controllers/AdminRouteController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleCheckerMiddleware = require("../middlewares/roleCheckerMiddleware");
const fileUpload = require("express-fileupload");

const router = require("express").Router();

router.use(roleCheckerMiddleware("admin"), authMiddleware);

router.get("/", AdminGetController);
router.post("/", fileUpload(), CreateCategoryPostController);
router.get("/:category_id", DeleteCategoryController);

module.exports = {
    path: "/admin",
    router,
};

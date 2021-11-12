const {
    AdminGetController,
    CreateCategoryPostController,
} = require("../controllers/AdminRouteController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleCheckerMiddleware = require("../middlewares/roleCheckerMiddleware");
const fileUpload = require("express-fileupload");

const router = require("express").Router();

router.use(roleCheckerMiddleware("admin"), authMiddleware);

router.get("/", AdminGetController);
router.post("/", fileUpload(), CreateCategoryPostController);

module.exports = {
    path: "/admin",
    router,
};

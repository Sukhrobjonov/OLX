const { AdminGetController } = require("../controllers/AdminRouteController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleCheckerMiddleware = require("../middlewares/roleCheckerMiddleware");

const router = require("express").Router();

router.use(roleCheckerMiddleware("admin"), authMiddleware);

router.get("/", AdminGetController);

module.exports = {
    path: "/admin",
    router,
};

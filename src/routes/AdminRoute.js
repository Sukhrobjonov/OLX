const { AdminGetController } = require("../controllers/AdminRouteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.use(authMiddleware);

router.get("/", AdminGetController);

module.exports = {
    path: "/admin",
    router,
};

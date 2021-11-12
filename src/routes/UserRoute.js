const {
    UserRegistrationGetController,
    UserLoginGetController,
    UserRegistrationPostController,
    UserLoginPostController,
    UserLogoutGetController,
} = require("../controllers/UserRouteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/registration", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/logout", UserLogoutGetController);

router.post("/registration", UserRegistrationPostController);
router.post("/login", UserLoginPostController);

module.exports = {
    path: "/users",
    router,
};

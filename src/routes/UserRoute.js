const {
    UserRegistrationGetController,
    UserLoginGetController,
    UserRegistrationPostController,
    UserLoginPostController,
    UserLogoutGetController,
    UserProfileGetController,
} = require("../controllers/UserRouteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/registration", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/logout", UserLogoutGetController);
router.get("/:user_id", UserProfileGetController);

router.post("/registration", UserRegistrationPostController);
router.post("/login", UserLoginPostController);

module.exports = {
    path: "/users",
    router,
};

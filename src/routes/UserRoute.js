const {
    UserRegistrationGetController,
    UserLoginGetController,
    UserRegistrationPostController,
    UserLoginPostController,
    UserLogoutGetController,
    UserProfileGetController,
    UserSessionsGetController,
    UserSessionsDeleteController,
} = require("../controllers/UserRouteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/registration", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/logout", UserLogoutGetController);
router.get("/sessions", authMiddleware, UserSessionsGetController);
router.get("/:user_id", authMiddleware, UserProfileGetController);
router.get(
    "/sessions/delete/:session_id",
    authMiddleware,
    UserSessionsDeleteController
);

router.post("/registration", UserRegistrationPostController);
router.post("/login", UserLoginPostController);

module.exports = {
    path: "/users",
    router,
};

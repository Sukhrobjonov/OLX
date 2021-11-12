const {
    UserRegistrationGetController,
    UserLoginGetController,
    UserRegistrationPostController,
    UserLoginPostController,
} = require("../controllers/UserRouteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/registration", UserRegistrationGetController);
router.get("/login", UserLoginGetController);

router.post("/registration", UserRegistrationPostController);
router.post("/login", UserLoginPostController);

module.exports = {
    path: "/users",
    router,
};

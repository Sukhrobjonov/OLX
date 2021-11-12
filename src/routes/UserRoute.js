const {
    UserRegistrationGetController,
    UserLoginGetController,
    UserRegistrationPostController,
} = require("../controllers/UserRouteController");

const router = require("express").Router();

router.get("/registration", UserRegistrationGetController);
router.get("/login", UserLoginGetController);

router.post("/registration", UserRegistrationPostController);

module.exports = {
    path: "/users",
    router,
};

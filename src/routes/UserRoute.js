const {
    UserRegistrationGetController,
    UserLoginGetController,
} = require("../controllers/UserRouteController");

const router = require("express").Router();

router.get("/registration", UserRegistrationGetController);
router.get("/login", UserLoginGetController);

module.exports = {
    path: "/users",
    router,
};

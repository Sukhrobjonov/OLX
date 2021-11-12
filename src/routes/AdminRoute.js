const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.use(authMiddleware);

router.get("/");

module.exports = {
    path: "/admin",
    router,
};

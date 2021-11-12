module.exports = async function authMiddleware(req, res, next) {
    req.user ? next() : res.redirect("/");
};

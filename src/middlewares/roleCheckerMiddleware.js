module.exports = function RoleChacker(role) {
    return function (req, res, next) {
        if (req.role === role) {
            next();
        } else {
            res.redirect("/");
        }
    };
};

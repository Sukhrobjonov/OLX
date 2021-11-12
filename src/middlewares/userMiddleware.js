const { verifyToken } = require("../modules/jwt");

module.exports = async function userMiddleware(req, res, next) {
    try {
        if (!req.cookies.token) {
            next();
            return;
        }

        const data = await verifyToken(req.cookies.token);

        if (!data) {
            next();
            return;
        }

        const session = await req.db.sessions.findOne({
            where: {
                session_id: data.session_id,
            },
            raw: true,
            include: req.db.users,
        });

        if (!session) {
            next();
            return;
        }

        req.user = session;
        req.role = session["user.user_role"];
        next();
    } catch (error) {
        console.log(error);
    }
};

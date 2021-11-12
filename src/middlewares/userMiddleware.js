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
        });

        if (!session) {
            next();
            return;
        }
        const user = await req.db.users.findOne({
            where: {
                user_id: session.user_id,
            },
            raw: true,
        });

        if (!user) {
            next();
            return;
        }

        req.user = user;
        req.role = user.user_role;

        next();
    } catch (error) {
        console.log(error);
    }
};

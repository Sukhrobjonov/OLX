const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const postgres = require("./modules/pg/postgres");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const routes = require("./routes/routes");
const userMiddleware = require("./middlewares/userMiddleware");
const PORT = process.env.PORT || 3000;

async function server(mode) {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, "public")));
        app.use(cookieParser());

        const db = await postgres();
        databaseMiddleware(db, app);

        if (mode === "dev") app.use(morgan("dev"));

        app.use(userMiddleware);
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "views"));
    } catch (error) {
        console.log("SERVER ERROR:", error);
    } finally {
        routes(app);
    }
}

module.exports = server;

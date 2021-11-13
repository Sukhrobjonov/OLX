const { CreateCategoryValidation } = require("../modules/validations");
const path = require("path");

module.exports = class AdminRouteController {
    static async AdminGetController(req, res) {
        try {
            res.render("admin", {
                user: req.user,
                role: req.role,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async CreateCategoryPostController(req, res) {
        try {
            const { category_name } = await CreateCategoryValidation(req.body);
            const photo = req?.files?.photo;

            if (!photo) throw new Error("Rasim Majburiy");

            if (photo?.size > 5 * 1024 * 1024)
                throw new Error("Rasimni hajimi 5 mb dan kamroq bo'lishi");

            let photo_name =
                photo.md5 +
                "." +
                photo.mimetype.split("/")[photo.mimetype.split("/").length - 1];

            photo.mv(path.join(__dirname, "..", "public", "img", photo_name));

            const category = await req.db.categories.create({
                category_name: category_name,
                category_photo: photo_name,
            });

            return res.redirect("/");
        } catch (error) {
            if (error.message === "Validation error") {
                error = "Error: Bunday Kategoriya mavjud";
            }
            res.render("admin", { error });
        }
    }

    static async DeleteCategoryController(req, res) {
        try {
            const { category_id } = req.params;
            const category = await req.db.categories.findOne({
                where: { category_id },
            });

            if (!category) throw new Error("Kategoriya topilmadi");

            await req.db.categories.destroy({
                where: { category_id },
            });

            return res.redirect("/");
        } catch (error) {
            res.render("admin", { error });
        }
    }
};

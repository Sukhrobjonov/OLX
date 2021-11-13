const { AddAdsValidation } = require("../modules/validations");
const path = require("path");
const { default: slugify } = require("slugify");

module.exports = class AdsRouteController {
    static async AdsAddGetController(req, res) {
        try {
            res.render("add_ads", {
                user: req.user,
                role: req.role,
                categories: await req.db.categories.findAll({ raw: true }),
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async AdsAddPostController(req, res) {
        try {
            const data = await AddAdsValidation(req.body);
            const photo = req?.files?.photo;

            const slug =
                slugify(data.title, {
                    lower: true,
                    strict: true,
                    replacement: "_",
                }) + Date.now();

            if (photo) {
                if (photo?.size > 5 * 1024 * 1024)
                    throw new Error("Rasimni hajimi 5 mb dan kamroq bo'lishi");

                let photo_name =
                    photo.md5 +
                    "." +
                    photo.mimetype.split("/")[
                        photo.mimetype.split("/").length - 1
                    ];

                photo.mv(
                    path.join(__dirname, "..", "public", "uploads", photo_name)
                );

                const ad = await req.db.ads.create({
                    ads_title: data.title,
                    ads_phone: data.phone,
                    ads_price: data.price,
                    ads_description: data.description,
                    ads_slug: slug,
                    ads_photo: photo_name,
                    user_id: req.user.user_id,
                    category_id: data.category,
                });

                return res.redirect("/ads/" + slug);
            }

            const ad = await req.db.ads.create({
                ads_title: data.title,
                ads_phone: data.phone,
                ads_price: data.price,
                ads_description: data.description,
                ads_slug: slug,
                user_id: req.user.user_id,
                category_id: data.category,
            });

            return res.redirect("/ads/" + slug);
        } catch (error) {
            console.log(error);
            res.render("add_ads", {
                error,
                user: req.user,
                role: req.role,
                categories: await req.db.categories.findAll({ raw: true }),
            });
        }
    }

    static async AdsGetOneController(req, res) {
        try {
            const ads = await req.db.ads.findOne({
                where: { ads_slug: req.params.slug },
                raw: true,
                include: [
                    {
                        model: req.db.users,
                        attributes: ["user_name", "user_email"],
                    },
                    {
                        model: req.db.categories,
                        attributes: ["category_name"],
                    },
                ],
            });

            console.log(ads);
            res.render("ads_page", {
                user: req.user,
                role: req.role,
                ads,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async AdsDeleteController(req, res) {
        try {
            const ads_id = req.params.ads_id;

            if (!ads_id) {
                res.redirect("/");
            }

            const user = req.user;

            if (!user) {
                res.redirect("/");
            }

            const ad = await req.db.ads.destroy({
                where: { ads_id: ads_id, user_id: user?.user_id },
                raw: true,
            });

            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
};

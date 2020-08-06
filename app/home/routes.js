const express = require("express");

const routes = express.Router();

const HomeController = require("./Controller");

routes.get("/", HomeController.index);
routes.get("/:slug", HomeController.showArticlesBySlug);
routes.get("/categories/:slug", HomeController.showCategoriesBySlug);
routes.get("/articles/page/:page", HomeController.paginateArticles);

module.exports = routes;

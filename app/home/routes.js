const express = require("express");

const routes = express.Router();

const HomeController = require("./Controller");
const ArticleController = require("../articles/Controller");
const CategoryController = require("../categories/Controller");

routes.get("/", HomeController.index);
routes.get("/:slug", ArticleController.showBySlug);
routes.get("/categories/:slug", CategoryController.showBySlug);
routes.get("/articles/page/:page", ArticleController.paginate);

module.exports = routes;

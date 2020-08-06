const express = require("express");

const routes = express.Router();

const ArticleController = require("./Controller");

routes.get("/", ArticleController.index);
routes.get("/create", ArticleController.create);
routes.get("/:id/edit", ArticleController.edit);

routes.post("/", ArticleController.store);
routes.post("/:id", ArticleController.update);
routes.post("/:id/destroy", ArticleController.destroy);

module.exports = routes;

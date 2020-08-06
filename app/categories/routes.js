const express = require("express");

const routes = express.Router();

const CategoryController = require("./Controller");

routes.get("/", CategoryController.index);
routes.get("/create", CategoryController.create);
routes.get("/:id/edit", CategoryController.edit);

routes.post("/", CategoryController.store);
routes.post("/:id", CategoryController.update);
routes.post("/:id/destroy", CategoryController.destroy);

module.exports = routes;

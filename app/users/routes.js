const express = require("express");

const routes = express.Router();

const adminAuthMiddleware = require("../core/middlewares/adminAuthMiddleware");

const UserController = require("./Controller");

routes.get("/", adminAuthMiddleware, UserController.index);
routes.get("/create", adminAuthMiddleware, UserController.create);
routes.get("/login", UserController.login);

routes.post("/", adminAuthMiddleware, UserController.store);
routes.get("/login", UserController.authenticate);

module.exports = routes;

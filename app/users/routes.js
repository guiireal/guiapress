const express = require("express");

const routes = express.Router();

const adminAuthMiddleware = require("../core/middlewares/adminAuthMiddleware");

const UserController = require("./Controller");

routes.get("/", adminAuthMiddleware, UserController.index);
routes.get("/create", adminAuthMiddleware, UserController.create);
routes.get("/login", UserController.login);
routes.get("/logout", UserController.logout);

routes.post("/", adminAuthMiddleware, UserController.store);
routes.post("/login", UserController.authenticate);

module.exports = routes;

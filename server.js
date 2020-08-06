const express = require("express");

const session = require("express-session");
const moment = require("moment");

class Server {
  constructor() {
    this.app = express();
    this.configs();
    this.middlewares();
  }

  configs() {
    require("dotenv").config();

    this.app.set("view engine", "ejs");

    this.app.use(
      session({
        secret: process.env.EXPRESS_SESSION,
        cookie: {
          maxAge: moment().add(1, "month").milliseconds(),
        },
        resave: true,
        saveUninitialized: true,
      })
    );
  }

  middlewares() {
    const adminAuthMiddleware = require("./app/core/middlewares/adminAuthMiddleware");

    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(require("./app/home/routes"));

    this.app.use(
      "/admin/categories",
      adminAuthMiddleware,
      require("./app/categories/routes")
    );

    this.app.use(
      "/admin/articles",
      adminAuthMiddleware,
      require("./app/articles/routes")
    );

    this.app.use("/admin/users", require("./app/users/routes"));
  }
}

module.exports = new Server().app;

const Sequelize = require("sequelize");
const connection = require("../../database/connection");
const Category = require("../categories/Model");

const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Article.belongsTo(Category);
Category.hasMany(Article);

module.exports = Article;

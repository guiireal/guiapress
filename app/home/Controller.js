const Article = require("../articles/Model");
const Category = require("../categories/Model");

class HomeController {
  async index(req, res) {
    const articles = await Article.findAll({
      order: [["id", "DESC"]],
      limit: 4,
    });
    const categories = await Category.findAll();

    return res.render("home/index", { articles, categories });
  }
}

module.exports = new HomeController();

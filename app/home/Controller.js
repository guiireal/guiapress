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

  async paginateArticles(req, res) {
    const { page } = req.params;
    const limit = 4;
    let offset = 0;

    if (isNaN(page) || page == 1) offset = 0;
    else offset = (parseInt(page) - 1) * limit;

    const articles = await Article.findAndCountAll({
      order: [["id", "DESC"]],
      limit,
      offset,
    });

    let next = offset + limit < articles.count;
    const categories = await Category.findAll();
    return res.render("home/page", {
      articles,
      next,
      categories,
      page: parseInt(page),
    });
  }

  async showArticlesBySlug(req, res) {
    const { slug } = req.params;
    try {
      const article = await Article.findOne({
        where: { slug },
      });
      if (!article) return res.redirect("/");
      const categories = await Category.findAll();
      return res.render("home/article", { article, categories });
    } catch (err) {
      console.error(err);
      return res.redirect("/");
    }
  }

  async showCategoriesBySlug(req, res) {
    const { slug } = req.params;
    try {
      const category = await Category.findOne({
        where: { slug },
        include: [{ model: Article }],
      });

      if (!category) return res.redirect("/");

      const categories = await Category.findAll({
        order: ["title"],
      });

      return res.render("home/index", {
        category,
        articles: category.articles,
        categories,
      });
    } catch (err) {
      console.error(err);
      return res.redirect("/");
    }
  }
}

module.exports = new HomeController();

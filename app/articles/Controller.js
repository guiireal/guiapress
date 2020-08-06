const Category = require("../categories/Model");
const Article = require("./Model");

const slugify = require("slugify");

class ArticleController {
  async index(req, res) {
    const articles = await Article.findAll({
      include: [{ model: Category }],
      order: ["title"],
    });
    return res.render("admin/articles/index", { articles });
  }

  async create(req, res) {
    const categories = await Category.findAll({ order: ["title"] });
    return res.render("admin/articles/create", { categories });
  }

  async store(req, res) {
    console.log(res);
    const { title, body, category: categoryId } = req.body;
    await Article.create({
      title,
      slug: slugify(title, { lower: true }),
      body,
      categoryId,
    });
    return res.redirect("/admin/articles");
  }

  async edit(req, res) {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.redirect("/admin/article");
    }
    const article = await Article.findByPk(id);
    if (!article) return res.redirect("/admin/article");
    const categories = await Category.findAll({ order: ["title"] });
    return res.render("admin/articles/edit", { article, categories });
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, body, category: categoryId } = req.body;
    await Article.update(
      {
        title,
        slug: slugify(title, { lower: true }),
        body,
        categoryId,
      },
      { where: { id } }
    );
    return res.redirect("/admin/articles");
  }

  async destroy(req, res) {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.redirect("/admin/articles");
    }

    await Article.destroy({
      where: { id },
    });
    return res.redirect("/admin/articles");
  }

  async showBySlug(req, res) {
    const { slug } = req.params;
    try {
      const article = await Article.findOne({
        where: { slug },
      });
      if (!article) return res.redirect("/");
      const categories = await Category.findAll();
      return res.render("home/article", { article, categories });
    } catch (err) {
      return res.redirect("/");
    }
  }

  async paginate(req, res) {
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
}

module.exports = new ArticleController();

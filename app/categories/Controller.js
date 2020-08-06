const Category = require("./Model");
const Article = require("../articles/Model");

const slugify = require("slugify");

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll({
      order: [["title", "ASC"]],
    });
    return res.render("admin/categories/index", { categories });
  }

  create(req, res) {
    return res.render("admin/categories/create");
  }

  async store(req, res) {
    const { title } = req.body;
    if (!title) return res.redirect("/admin/categories/create");
    await Category.create({
      title,
      slug: slugify(title, { lower: true }),
    });
    return res.redirect("/admin/categories");
  }

  async edit(req, res) {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.redirect("/admin/categories");
    }
    const category = await Category.findByPk(id);
    if (!category) return res.redirect("/admin/categories");
    return res.render("admin/categories/edit", { category });
  }

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    await Category.update(
      { title, slug: slugify(title, { lower: true }) },
      { where: { id } }
    );
    return res.redirect("/admin/categories");
  }

  async destroy(req, res) {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.redirect("/admin/categories");
    }

    await Category.destroy({
      where: { id },
    });
    return res.redirect("/admin/categories");
  }
}

module.exports = new CategoryController();

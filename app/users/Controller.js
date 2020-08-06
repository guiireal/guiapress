const User = require("./Model");

const bcrypt = require("bcryptjs");
const session = require("express-session");

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.render("admin/users/index", { users });
  }

  create(req, res) {
    return res.render("admin/users/create");
  }

  async store(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.redirect("/admin/users/create");

    const userExistWithSameEmail = await User.findOne({ where: email });

    if (userExistWithSameEmail) return res.redirect("/admin/users/create");

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);
    try {
      await User.create({ email, password: passwordHashed });
    } catch (err) {
      console.error(err);
      return res.redirect("/admin/users");
    }
    return res.redirect("/admin/users");
  }

  login(req, res) {
    return res.render("admin/users/login");
  }

  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.redirect("/admin/users/login");

    if (!bcrypt.compareSync(password, user.password))
      return res.redirect("/admin/users/login");

    req.session.user = {
      id: user.id,
      email,
    };
    return res.redirect("/admin/articles");
  }

  logout(req, res) {
    req.session.user = undefined;
    return res.redirect("/");
  }
}

module.exports = new UserController();

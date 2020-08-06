module.exports = (req, res, next) => {
  if (!req.session.user) return res.redirect("/admin/users/login");
  return next();
};

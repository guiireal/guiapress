const express = require("express");
const port = process.env.port || 3000;
const app = express();

require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./app/home/routes"));
app.use("/admin/categories", require("./app/categories/routes"));
app.use("/admin/articles", require("./app/articles/routes"));

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Servidor rodando na porta ${port}`);
});

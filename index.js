const port = process.env.port || 3000;

const server = require("./server");

server.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Servidor rodando na porta ${port}`);
});

const express = require("express");
const page = require("./pageExe");
const app = express();

app.use(express.json()); // server can receive json
app.use(express.text()); // server can receive string

app.get("/headers", (req, res) => {
  const headers = req.headers;
  const query_params = req.query;
  console.log("In Headers: ", headers);
  res.send({ headers, query_params });
});

app.get("/params/:key/:second", (req, res) => {
  const params = req.params;
  console.log("In Params: ", params);
  res.send(params);
});

app.get("/query", (req, res) => {
  const query_params = req.query;
  console.log("In Query Params: ", query_params);
  res.send(query_params);
});

app.get("/body", (req, res) => {
  const body = req.body;
  console.log("In Body: ", body);
  res.header({ my_header: "david yakin" });
  res.send(body);
});

app.get("/html", (req, res) => {
  res.send(page);
});

const PORT = 5151;
app.listen(PORT, () => console.log(`Listening on : http://localhost:${PORT}`));

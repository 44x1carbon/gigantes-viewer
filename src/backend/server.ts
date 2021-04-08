import express from "express";
import path from "path";
import { getDirTree } from "./directory-tree";
import { html } from "./hoge";
const app = express();

app.use(express.static(path.join(__dirname, "../../public")));

const dir = `${process.cwd()}/${process.argv[2]}`;

app.get("/api/directory", (req, res) => {
  res.send(getDirTree(dir));
});

app.get("/api/html", (req, res) => {
  res.send(html(req.query.filePath, req.query.url, req.query.domSelectorName));
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(3000, () => {
  console.log(`gigantes-viewer: http://localhost:3000`);
});

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/api.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/api.js"));
});

app.get("/data.text", (req, res) => {
  res.sendFile(path.join(__dirname + "/data.text"));
});

app.get("/index.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.css"));
});

app.use("/assets", express.static("assets"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

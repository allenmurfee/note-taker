const express = require("express");
const path = require("path");
const api = require("./routes/api.js");
const notes = require("./routes/notes.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/notes", notes);

app.use(express.static("public"));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, (req, res) => console.log("App listening at PORT"));

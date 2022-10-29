const apiNotes = require("express").Router();

apiNotes.get("/", (req, res) => {
  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});

const apiNotes = require("express").Router();
const fs = require("fs");
const path = require("path");

apiNotes.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
    console.log(data);
  });
});

apiNotes.post("/", (req, res) => {
    console.log(req.body);
})

module.exports = apiNotes;

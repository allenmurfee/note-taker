const notes = require("express").Router();

notes.get("/", (req, res) => {
  console.log("firing");
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = notes;

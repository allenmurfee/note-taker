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
  const { title, test } = req.body;

  if (title && test) {
    const newNote = {
      title,
      test,
    };

    const newNotePost = JSON.stringify(newNote);
    fs.writeFile("../db/db.json", newNotePost, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    );
    res.status(201).json("Success");
  } else {
    res.status(500).json("Error in writing note");
  }
});

module.exports = apiNotes;

const apiNotes = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// const notes = require("../db/db.json");

apiNotes.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

apiNotes.post("/", (req, res) => {
  // console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) throw err;

      console.log(data);

      const parsedNotes = JSON.parse(data);
      parsedNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.title} has been written to JSON file`
            )
      );
    });
    res.status(201).json("Success");
  } else {
    res.status(500).json("Error in writing note");
  }
});

apiNotes.delete("/:id", (req, res) => {
  const paramId = req.params.id;
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    // console.log(data[1].id);
    console.log(paramId);
    //Need to remove from JSON file
    let findId = data.filter((id) => res.data.id == paramId);
    console.log(findId);
  });
});
module.exports = apiNotes;

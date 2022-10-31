const apiNotes = require("express").Router();
const fs = require("fs");
const path = require("path");
const notes = require("../db/db.json");

apiNotes.get("/", (req, res) => {
  // fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
  //   if (err) throw err;
  //   res.json(JSON.parse(data));
  // console.log(data);

  res.json(notes);
});

apiNotes.post("/", (req, res) => {
  // console.log(req.body);
  var dataArray = [];
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;

      const parseData = JSON.parse(data);
      dataArray.push(parseData);
      const parseNote = JSON.parse(newNote);
      dataArray.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(dataArray), (err) =>
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

module.exports = apiNotes;

const apiNotes = require("express").Router();
const fs = require("fs");
const path = require("path");
const notes = require("../db/db.json");
// var dataArray = [];

apiNotes.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
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
    };
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) throw err;

      console.log(data)

      const parsedNotes = JSON.parse(data);
      parsedNotes.push(newNote);
      // const stringData = JSON.stringify(data);
      // console.log(data);
      // console.log(stringData)
      // dataArray.push(stringData);
      // console.log(dataArray);
      // const stringNote = JSON.stringify(newNote);
      // dataArray.push(stringNote);
      // console.log(dataArray);

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

module.exports = apiNotes;
